import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilesService } from 'src/files/files.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  providers: [BrandService, PrismaService, FilesService],
  controllers: [BrandController],
  imports: [
    MulterModule.register({
      dest: './assets',
    }),
  ],
})
export class BrandModule {}
