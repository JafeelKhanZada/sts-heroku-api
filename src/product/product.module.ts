import { Module } from '@nestjs/common';
import { BrandService } from 'src/brand/brand.service';
import { CategoryService } from 'src/category/category.service';
import { FilesService } from 'src/files/files.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubCategoryService } from 'src/sub-category/sub-category.service';
import { TagService } from 'src/tag/tag.service';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  providers: [
    ProductService,
    FilesService,
    BrandService,
    SubCategoryService,
    CategoryService,
    TagService,
    PrismaService,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
