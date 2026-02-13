import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users, subscriptions, campaigns, messages,
  InsertSubscription, InsertCampaign, InsertMessage,
  User, Subscription, Campaign, Message
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;
let _mockStore = {
  users: [] as User[],
  subscriptions: [] as Subscription[],
  campaigns: [] as Campaign[],
  messages: [] as Message[]
};

// Initialize mock data for dev user
const DEV_USER_ID = 1;
if (!_mockStore.users.find(u => u.id === DEV_USER_ID)) {
  _mockStore.users.push({
    id: DEV_USER_ID,
    openId: "dev-user-001",
    name: "Dev User",
    email: "dev@outreach-iq.local",
    loginMethod: "mock",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date()
  });
}

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// Helper to generate IDs for mock store
const generateId = (collection: any[]) => {
  return collection.length > 0 ? Math.max(...collection.map(i => i.id)) + 1 : 1;
};

export async function upsertUser(user: InsertUser): Promise<void> {
  const db = await getDb();

  if (!db) {
    // Mock implementation
    const existingIndex = _mockStore.users.findIndex(u => u.openId === user.openId);
    if (existingIndex >= 0) {
      _mockStore.users[existingIndex] = { ..._mockStore.users[existingIndex], ...user, updatedAt: new Date() } as User;
    } else {
      _mockStore.users.push({
        ...user,
        id: generateId(_mockStore.users),
        role: user.role || 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: user.lastSignedIn || new Date()
      } as User);
    }
    return;
  }

  // Real DB implementation
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    textFields.forEach(field => {
      if (user[field] !== undefined) {
        values[field] = user[field] ?? null;
        updateSet[field] = user[field] ?? null;
      }
    });

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }

    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) values.lastSignedIn = new Date();

    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    return _mockStore.users.find(u => u.openId === openId);
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Subscription helpers
export async function getOrCreateSubscription(userId: number) {
  const db = await getDb();

  if (!db) {
    let sub = _mockStore.subscriptions.find(s => s.userId === userId);
    if (!sub) {
      sub = {
        id: generateId(_mockStore.subscriptions),
        userId,
        plan: "free",
        generationsUsed: 0,
        generationsLimit: 3,
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
        stripeCustomerId: null,
        stripeSubscriptionId: null,
        currentPeriodStart: null,
        currentPeriodEnd: null
      };
      _mockStore.subscriptions.push(sub);
    }
    return sub;
  }

  const result = await db.select().from(subscriptions).where(eq(subscriptions.userId, userId)).limit(1);
  if (result.length > 0) return result[0];

  await db.insert(subscriptions).values({
    userId,
    plan: "free",
    generationsUsed: 0,
    generationsLimit: 3,
    status: "active",
  });

  const newResult = await db.select().from(subscriptions).where(eq(subscriptions.userId, userId)).limit(1);
  return newResult.length > 0 ? newResult[0] : undefined;
}

export async function updateSubscription(subscriptionId: number, data: Partial<InsertSubscription>) {
  const db = await getDb();

  if (!db) {
    const index = _mockStore.subscriptions.findIndex(s => s.id === subscriptionId);
    if (index >= 0) {
      _mockStore.subscriptions[index] = { ..._mockStore.subscriptions[index], ...data, updatedAt: new Date() } as Subscription;
      return _mockStore.subscriptions[index];
    }
    return undefined;
  }

  await db.update(subscriptions).set(data).where(eq(subscriptions.id, subscriptionId));
  const result = await db.select().from(subscriptions).where(eq(subscriptions.id, subscriptionId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Campaign helpers
export async function createCampaign(data: InsertCampaign) {
  const db = await getDb();

  if (!db) {
    const newCampaign: Campaign = {
      ...data,
      id: generateId(_mockStore.campaigns),
      prospectName: data.prospectName ?? null,
      prospectProfile: data.prospectProfile ?? null,
      prospectBio: data.prospectBio ?? null,
      tone: data.tone || 'friendly',
      status: data.status || 'draft',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    _mockStore.campaigns.push(newCampaign);
    return newCampaign;
  }

  const result = await db.insert(campaigns).values(data);
  const newCampaign = await db.select().from(campaigns).where(eq(campaigns.id, result[0].insertId as number)).limit(1);
  return newCampaign.length > 0 ? newCampaign[0] : undefined;
}

export async function getCampaignsByUserId(userId: number) {
  const db = await getDb();
  if (!db) {
    return _mockStore.campaigns.filter(c => c.userId === userId);
  }
  return await db.select().from(campaigns).where(eq(campaigns.userId, userId));
}

export async function getCampaignById(campaignId: number) {
  const db = await getDb();
  if (!db) {
    return _mockStore.campaigns.find(c => c.id === campaignId);
  }
  const result = await db.select().from(campaigns).where(eq(campaigns.id, campaignId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Message helpers
export async function createMessage(data: InsertMessage) {
  const db = await getDb();

  if (!db) {
    const newMessage: Message = {
      ...data,
      id: generateId(_mockStore.messages),
      followUp1: data.followUp1 ?? null,
      followUp2: data.followUp2 ?? null,
      psychologyBreakdown: data.psychologyBreakdown ?? null,
      painPointIdentified: data.painPointIdentified ?? null,
      authorityAngle: data.authorityAngle ?? null,
      curiosityTrigger: data.curiosityTrigger ?? null,
      ctaStructure: data.ctaStructure ?? null,
      createdAt: new Date()
    };
    _mockStore.messages.push(newMessage);
    return newMessage;
  }

  const result = await db.insert(messages).values(data);
  const newMessage = await db.select().from(messages).where(eq(messages.id, result[0].insertId as number)).limit(1);
  return newMessage.length > 0 ? newMessage[0] : undefined;
}

export async function getMessagesByCampaignId(campaignId: number) {
  const db = await getDb();
  if (!db) {
    return _mockStore.messages.filter(m => m.campaignId === campaignId);
  }
  return await db.select().from(messages).where(eq(messages.campaignId, campaignId));
}

export async function getMessagesByUserId(userId: number) {
  const db = await getDb();
  if (!db) {
    return _mockStore.messages.filter(m => m.userId === userId);
  }
  return await db.select().from(messages).where(eq(messages.userId, userId));
}
