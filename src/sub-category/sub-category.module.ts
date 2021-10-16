import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilesService } from 'src/files/files.service';
import { CategoryService } from 'src/category/category.service';

@Module({
  providers: [SubCategoryService, PrismaService, FilesService, CategoryService],
  controllers: [SubCategoryController],
})
export class SubCategoryModule {}
