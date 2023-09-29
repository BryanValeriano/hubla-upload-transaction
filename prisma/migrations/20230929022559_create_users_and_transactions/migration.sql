-- CreateTable
CREATE TABLE `transactions` (
    `id` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `productDescription` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `transactionOwnerName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `userName` VARCHAR(191) NOT NULL,
    `balance` INTEGER NOT NULL,

    PRIMARY KEY (`userName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
