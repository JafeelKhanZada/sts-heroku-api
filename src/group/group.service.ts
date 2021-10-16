/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}
  makeGroup(body: any) {
    return this.prismaService.group
      .create({
        data: {
          name: body.name,
        },
      })
      .then(res => {
        const data = body?.products?.map(v => ({
          product_id: v,
          group_id: res.id,
        }));
        return this.prismaService.productGroup.createMany({
          data,
        });
      });
  }
  getGroups(query: any) {
    const skip = query?.skip
      ? parseInt(query?.skip) * parseInt(query?.take)
      : 0;
    const take = query?.take ? parseInt(query?.take) : 10;
    const search = query?.search || '';
    return this.prismaService.group
      .findMany({
        where: {
          OR: [
            {
              name: {
                contains: search,
              },
            },
          ],
        },
        take,
        skip,
        include: {
          ProductGroup: {
            select: {
              product: {
                include: {
                  brand: true,
                  subCategory: {
                    include: {
                      category: true,
                    },
                  },
                },
              },
            },
          },
        },
      })
      .then(res =>
        this.prismaService.group.count().then(val => ({
          count: val,
          data: res,
        })),
      );
  }
  updateFieldsByGroup(id: string, body: any) {
    const { data, file } = body;
    return this.prismaService.productGroup
      .findMany({
        where: {
          group_id: id,
        },
      })
      .then(res => {
        const map = res.map(v => v.product_id);
        return this.prismaService.product
          .updateMany({
            where: {
              id: { in: map },
            },
            data,
          })
          .then(() => {
            if (file) {
              return this.prismaService.productFiles
                .deleteMany({
                  where: {
                    id: { in: map },
                  },
                })
                .then(() => {
                  const value = map.map(v => {
                    return file.map(f => ({
                      product_id: v,
                      file_id: f,
                    }));
                  });
                  console.log('valuee', value.flat());
                  return this.prismaService.productFiles.createMany({
                    data: value.flat(),
                  });
                });
            }
          });
      });
  }
}
