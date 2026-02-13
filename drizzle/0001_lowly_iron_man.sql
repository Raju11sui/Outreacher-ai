CREATE TABLE `campaigns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`prospectName` varchar(255),
	`prospectProfile` varchar(500),
	`prospectBio` text,
	`serviceDescription` text NOT NULL,
	`outreachGoal` enum('book_call','close_sale','partnership') NOT NULL,
	`tone` enum('direct','friendly','authority','premium') NOT NULL DEFAULT 'friendly',
	`status` enum('draft','completed','archived') NOT NULL DEFAULT 'draft',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `campaigns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`campaignId` int NOT NULL,
	`userId` int NOT NULL,
	`hookLine` text NOT NULL,
	`mainMessage` text NOT NULL,
	`followUp1` text,
	`followUp2` text,
	`psychologyBreakdown` text,
	`painPointIdentified` text,
	`authorityAngle` text,
	`curiosityTrigger` text,
	`ctaStructure` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`plan` enum('free','starter','pro','agency') NOT NULL DEFAULT 'free',
	`generationsUsed` int NOT NULL DEFAULT 0,
	`generationsLimit` int NOT NULL DEFAULT 3,
	`stripeCustomerId` varchar(255),
	`stripeSubscriptionId` varchar(255),
	`status` enum('active','canceled','past_due') NOT NULL DEFAULT 'active',
	`currentPeriodStart` timestamp,
	`currentPeriodEnd` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
