import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilesService } from 'src/files/files.service';

@Module({
  providers: [CategoryService, PrismaService, FilesService],
  controllers: [CategoryController],
})
export class CategoryModule {}
