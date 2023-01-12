-- creating user
CREATE USER 'chevoska_client'@'%' IDENTIFIED BY 'Asdfgh123456!' PASSWORD EXPIRE NEVER;
-- ALTER USER 'partners_client'@'%' IDENTIFIED WITH mysql_native_password BY 'L%&cx^Lj-x72fH`a';

-- drop DB if exist
DROP SCHEMA IF EXISTS `chevoska_db`;

-- creating schema
CREATE SCHEMA `chevoska_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- granting permission
GRANT ALL ON `chevoska_db`.* TO 'chevoska_client'@'%';

USE chevoska_db;

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int NOT NULL,
  `title` varchar(80)DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO roles(id,title) values
(1, 'user'),(2, 'client');

DROP TABLE IF EXISTS `stream_statuses`;
CREATE TABLE `stream_statuses` (
  `id` int NOT NULL,
  `title` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50)  NOT NULL,
  `password_hash` varchar(64) NOT NULL,
  `password_salt` varchar(16) NOT NULL,
  `role_id` int DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '0',
  `confirm_token` varchar(64)  DEFAULT NULL,
  `token_expiration_date` datetime(6) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `forgot_password_token` varchar(64) DEFAULT NULL,
  `forgot_password_expiration_date` datetime(6) DEFAULT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
);

DROP TABLE IF EXISTS `profiles`;
CREATE TABLE `profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(80) DEFAULT NULL,
  `last_name` varchar(80) DEFAULT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `timezone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
);



DROP TABLE IF EXISTS `stream`;
CREATE TABLE `stream` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(80) DEFAULT NULL,
  `description` varchar(80) DEFAULT NULL,
  `status_id` int NOT NULL,
  `user_id` int NOT NULL,
  `enter_link` varchar(255) DEFAULT NULL,
  `create_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_date` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `start_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `download_link` varchar(255) DEFAULT NULL,
  `private` tinyint(1) NOT NULL DEFAULT '0',
  `enter_key` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `status_id` (`status_id`),
  KEY `user_id` (`user_id`),
  FOREIGN KEY (`status_id`) REFERENCES `stream_statuses` (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

DROP TABLE IF EXISTS `stream_reviews`;
CREATE TABLE `stream_reviews` (
  `user_id` int DEFAULT NULL,
  `stream_id` int DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  KEY `user_id` (`user_id`),
  KEY `stream_id` (`stream_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`stream_id`) REFERENCES `stream` (`id`)
);

CREATE TABLE `stream_clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stream_id` int DEFAULT NULL,
  `username` varchar(80) not null,
  `email` varchar(50)  DEFAULT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `timezone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `stream_id` (`stream_id`),
  FOREIGN KEY (`stream_id`) REFERENCES `stream` (`id`)
);


