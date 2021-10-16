-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL DEFAULT '',
    `fileId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `Files`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
