CREATE TABLE `registrations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`parent_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`child_name` text NOT NULL,
	`child_age` integer NOT NULL,
	`program` text NOT NULL,
	`notes` text,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
