import { Injectable } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FilesService,
  ) {}
  createCategory(body: any, file: any) {
    return this.fileService.uploadFile(file).then(res => {
      return this.prismaService.category.create({
        data: {
          name: body?.name,
          description: body?.description,
          fileId: res.id,
        },
      });
    });
  }
  getCategory(query: any) {
    const skip = query?.skip
      ? parseInt(query?.skip) * parseInt(query?.take)
      : 0;
    const take = query?.take ? parseInt(query?.take) : 10;
    const search = query?.search || '';
    return this.prismaService.category
      .findMany({
        where: {
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              description: {
                contains: search,
              },
            },
          ],
        },
        take,
        skip,
        include: {
          file: true,
          Product: true,
        },
      })
      .then(res =>
        this.prismaService.category.count().then(val => ({
          count: val,
          data: res.map(v => ({
            ...v,
            files: {
              ...v.file,
              destination: v.file.destination.split('/')[1],
            },
          })),
        })),
      );
  }
  updateCategory(id: string, body: any) {
    return this.prismaService.category.update({
      data: body,
      where: { id },
    });
  }
  getById(id: string) {
    return this.prismaService.category
      .findUnique({
        where: { id },
        include: { file: true },
      })
      .then(v => {
        return {
          ...v,
          files: {
            ...v.file,
            destination: v.file.destination.split('/')[1],
          },
        };
      });
  }
}
