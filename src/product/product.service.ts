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
    let filters: any = {
      OR: [],
    };
    filters = {
      OR: [
        ...filters.OR,
        {
          name: {
            contains: search,
          },
        },
        {
          part_no: {
            contains: search,
          },
        },
        {
          description: {
            contains: search,
          },
        },
        {
          brand: {
            name: {
              contains: search,
            },
          },
        },
        {
          category: {
            name: {
              contains: search,
            },
          },
        },
        {
          subCategory: {
            name: {
              contains: search,
            },
          },
        },
      ],
    };
    return this.prismaService.product
      .findMany({
        take,
        skip,
        where: filters,
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
  getProductForListing(query: any, body: any) {
    const skip = query?.skip
      ? parseInt(query?.skip) * parseInt(query?.take)
      : 0;
    const take = query?.take ? parseInt(query?.take) : 10;
    const search = body?.search || '';
    let filters: any = {
      OR: [],
      AND: [],
    };
    if (body?.category) {
      filters.AND.push({
        category_id: {
          in: body?.category,
        },
      });
    }
    if (body?.brand) {
      filters.AND.push({
        brand_id: {
          in: body?.brand,
        },
      });
    }
    if (body?.subCategory) {
      filters.AND.push({
        subCategory_id: {
          in: body?.subCategory,
        },
      });
    }
    filters = {
      AND: filters.AND,
      OR: [
        ...filters.OR,
        {
          name: {
            contains: search,
          },
        },
        {
          part_no: {
            contains: search,
          },
        },
        {
          description: {
            contains: search,
          },
        },
        {
          brand: {
            name: {
              contains: search,
            },
          },
        },
        {
          category: {
            name: {
              contains: search,
            },
          },
        },
        {
          subCategory: {
            name: {
              contains: search,
            },
          },
        },
      ],
    };
    return this.prismaService.product
      .findMany({
        take,
        where: filters,
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
}
