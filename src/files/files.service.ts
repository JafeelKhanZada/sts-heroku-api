import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(private readonly prismaService: PrismaService) {}
  uploadFile(file: any) {
    return this.prismaService.files.create({
      data: {
        name: file.originalname,
        size: `${file.size}`,
        ext: '',
        destination: file.path,
      },
    });
  }
  uploadFileMany(files: any[]) {
    return this.prismaService.files.createMany({
      data: files.map(file => ({
        name: file.originalname,
        size: `${file.size}`,
        ext: '',
        destination: file.path,
      })),
    });
  }
}
