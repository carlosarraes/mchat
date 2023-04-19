CREATE TABLE `messages` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`username` varchar(256),
	`message` text,
	`timestamp` timestamp
);
