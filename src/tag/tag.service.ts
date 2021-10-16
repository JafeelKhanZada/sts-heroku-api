import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}
  createTag(body: any) {
    return this.prismaService.tag.create({
      data: body,
    });
  }
  getTags(query: any) {
    const skip = query?.skip
      ? parseInt(query?.skip) * parseInt(query?.take)
      : 0;
    const take = query?.take ? parseInt(query?.take) : 10;
    const search = query?.search || '';
    return this.prismaService.tag
      .findMany({
        where: {
          name: {
            contains: search,
          },
        },
        take,
        skip,
      })
      .then(res =>
        this.prismaService.tag.count().then(val => ({
          count: val,
          data: res,
        })),
      );
  }
  updateTag(id: string, body: any) {
    return this.prismaService.tag.update({
      where: {
        id,
      },
      data: body,
    });
  }
  getById(id: string) {
    return this.prismaService.tag.findMany({
      where: { id },
    });
  }
}
