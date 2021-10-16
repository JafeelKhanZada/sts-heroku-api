/* eslint-disable @typescript-eslint/camelcase */
import { HttpException, Injectable } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly fileService: FilesService,
    private readonly prismaService: PrismaService,
  ) {}
  createProduct(body: any, file: any) {
    return this.prismaService.product
      .create({
        data: { ...body, Quantity: parseInt(body.Quantity) },
      })
      .then((res: any) => {
        if (file) {
          const data = file.map(v => ({ product_id: res.id, file_id: v }));
          return this.prismaService.productFiles
            .createMany({
              data: data,
            })
            .catch(e => console.log('ee', e));
        }
        return res;
      })
      .catch(e => new HttpException(e.message, 500));
  }
  getProduct(query: any) {
    const skip = query?.skip
      ? parseInt(query?.skip) * parseInt(query?.take)
      : 0;
    const take = query?.take ? parseInt(query?.take) : 10;
    const search = query?.search || '';
    console.log('query?.category', query?.category);
    return this.prismaService.product
      .findMany({
        where: {
          OR: [
            {
              subCategory: {
                categoryId: {
                  equals: query?.category,
                },
              },
            },
          ],
        },
        take,
        skip,
        include: {
          ProductFiles: {
            include: {
              file: true,
            },
          },
          brand: true,
          subCategory: {
            include: {
              category: true,
            },
          },
        },
      })
      .then(res =>
        this.prismaService.product.count().then(val => ({
          count: val,
          data: res,
        })),
      );
  }
  updateById(id: string, body: any) {
    return this.prismaService.product
      .update({
        where: {
          id,
        },
        data: body,
      })
      .catch(e => console.log('ee', e));
  }
  getProductById(id: string) {
    return this.prismaService.product.findUnique({
      where: {
        id,
      },
      include: {
        brand: true,
        subCategory: true,
        ProductFiles: {
          include: {
            file: true,
          },
        },
      },
    });
  }
}
