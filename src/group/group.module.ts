import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';
import { SubCategoryService } from 'src/sub-category/sub-category.service';
import { FilesService } from 'src/files/files.service';
import { CategoryService } from 'src/category/category.service';

@Module({
  providers: [
    GroupService,
    PrismaService,
    ProductService,
    CategoryService,
    SubCategoryService,
    FilesService,
  ],
  controllers: [GroupController],
})
export class GroupModule {}
