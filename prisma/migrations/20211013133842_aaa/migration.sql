-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `part_no` VARCHAR(191) NOT NULL DEFAULT '',
    `description` VARCHAR(191) NOT NULL DEFAULT '',
    `Quantity` INTEGER NOT NULL DEFAULT 0,
    `brand_id` VARCHAR(191) NOT NULL,
    `subCategory_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductFiles` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `file_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_brand_id_fkey` FOREIGN KEY (`brand_id`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_subCategory_id_fkey` FOREIGN KEY (`subCategory_id`) REFERENCES `SubCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductFiles` ADD CONSTRAINT `ProductFiles_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductFiles` ADD CONSTRAINT `ProductFiles_file_id_fkey` FOREIGN KEY (`file_id`) REFERENCES `Files`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
