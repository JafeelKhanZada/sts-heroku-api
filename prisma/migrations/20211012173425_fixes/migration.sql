/*
  Warnings:

  - Added the required column `fileId` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Brand` ADD COLUMN `fileId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Brand` ADD CONSTRAINT `Brand_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `Files`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
