-- init.sql
CREATE DATABASE IF NOT EXISTS mydb;
GRANT ALL PRIVILEGES ON mydb.* TO 'johndoe'@'%';
GRANT CREATE, ALTER, DROP ON *.* TO 'johndoe'@'%';
FLUSH PRIVILEGES;

-- create lock table with correct valuas
USE mydb;
INSERT INTO `Lock` (name, locked) VALUES ('updateBalanceLock', false) ON DUPLICATE KEY UPDATE name = name;

