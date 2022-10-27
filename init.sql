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

CREATE TABLE users (
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
name varchar(255)
);

