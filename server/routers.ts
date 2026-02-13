import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getOrCreateSubscription, getCampaignsByUserId, createCampaign, createMessage, getMessagesByUserId } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  subscription: router({
    getOrCreate: protectedProcedure.query(({ ctx }) =>
      getOrCreateSubscription(ctx.user.id)
    ),
  }),

  campaign: router({
    list: protectedProcedure.query(({ ctx }) =>
      getCampaignsByUserId(ctx.user.id)
    ),
    create: protectedProcedure
      .input(z.object({
        prospectName: z.string().optional(),
        prospectProfile: z.string().optional(),
        prospectBio: z.string().optional(),
        serviceDescription: z.string(),
        outreachGoal: z.enum(["book_call", "close_sale", "partnership"]),
        tone: z.enum(["direct", "friendly", "authority", "premium"]).default("friendly"),
      }))
      .mutation(({ ctx, input }) =>
        createCampaign({
          userId: ctx.user.id,
          ...input,
        })
      ),
  }),

  message: router({
    list: protectedProcedure.query(({ ctx }) =>
      getMessagesByUserId(ctx.user.id)
    ),
    generate: protectedProcedure
      .input(z.object({
        campaignId: z.number(),
        hookLine: z.string(),
        mainMessage: z.string(),
        followUp1: z.string().optional(),
        followUp2: z.string().optional(),
        psychologyBreakdown: z.string().optional(),
        painPointIdentified: z.string().optional(),
        authorityAngle: z.string().optional(),
        curiosityTrigger: z.string().optional(),
        ctaStructure: z.string().optional(),
      }))
      .mutation(({ ctx, input }) =>
        createMessage({
          userId: ctx.user.id,
          ...input,
        })
      ),
  }),
});

export type AppRouter = typeof appRouter;
