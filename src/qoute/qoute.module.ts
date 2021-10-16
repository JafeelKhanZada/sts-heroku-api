import { Module } from '@nestjs/common';
import { QouteService } from './qoute.service';
import { QouteController } from './qoute.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';
import { CategoryService } from 'src/category/category.service';
import { BrandService } from 'src/brand/brand.service';
import { SubCategoryService } from 'src/sub-category/sub-category.service';
import { FilesService } from 'src/files/files.service';

@Module({
  providers: [
    QouteService,
    PrismaService,
    ProductService,
    CategoryService,
    BrandService,
    SubCategoryService,
    FilesService,
  ],
  controllers: [QouteController],
})
export class QouteModule {}
