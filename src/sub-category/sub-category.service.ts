import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { FilesService } from 'src/files/files.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubCategoryService {
  constructor(
    private readonly fileService: FilesService,
    private readonly prismaService: PrismaService,
    private readonly categoryService: CategoryService,
  ) {}
  createSubCategory(body: any, file: any) {
    return this.fileService.uploadFile(file).then(Res => {
      return this.prismaService.subCategory.create({
        data: {
          name: body?.name,
          description: body?.description,
          fileId: Res.id,
          categoryId: body?.category,
        },
      });
    });
  }
  getSubCategory(query: any) {
    const skip = query?.skip
      ? parseInt(query?.skip) * parseInt(query?.take)
      : 0;
    const take = query?.take ? parseInt(query?.take) : 10;
    const search = query?.search || '';
    return this.prismaService.subCategory
      .findMany({
        where: {
          name: {
            contains: search,
          },
        },
        take,
        skip,
        include: {
          file: true,
          category: true,
        },
      })
      .then(res =>
        this.prismaService.subCategory.count().then(val => ({
          count: val,
          data: res,
        })),
      );
  }
  updateSubCategory(id: string, body: any) {
    return this.prismaService.subCategory.update({
      where: {
        id,
      },
      data: body,
    });
  }
  getSubCategoryById(id: string) {
    return this.prismaService.subCategory.findUnique({
      where: {
        id,
      },
    });
  }
  getByMainCategory(id: string) {
    return this.prismaService.subCategory.findMany({
      where: {
        categoryId: id,
      },
    });
  }
}
