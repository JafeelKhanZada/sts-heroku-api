import { Body, Injectable } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FilesService,
  ) {}
  makeBrand(body: any, file: any) {
    return this.fileService.uploadFile(file).then(res => {
      console.log('res', res);
      return this.prismaService.brand.create({
        data: {
          name: body?.name,
          fileId: res.id,
        },
      });
    });
  }
  getBrands(query: any) {
    const skip = query?.skip
      ? parseInt(query?.skip) * parseInt(query?.take)
      : 0;
    const take = query?.take ? parseInt(query?.take) : 10;
    const search = query?.search || '';
    return this.prismaService.brand
      .findMany({
        where: {
          name: {
            contains: search,
          },
        },
        take,
        skip,
        include: {
          files: true,
        },
      })
      .then(res =>
        this.prismaService.brand.count().then(val => ({
          count: val,
          data: res.map(v => ({
            ...v,
            files: {
              ...v.files,
              destination: v.files.destination.split('/')[1],
            },
          })),
        })),
      );
  }
  updateBrands(id: string, body: any) {
    return this.prismaService.brand.update({
      data: body,
      where: { id },
    });
  }
  getBrandById(id: string) {
    return this.prismaService.brand
      .findUnique({
        where: { id },
        include: { files: true },
      })
      .then(res => {
        return {
          ...res,
          files: {
            ...res.files,
            destination: res.files.destination.split('/')[1],
          },
        };
      });
  }
}
