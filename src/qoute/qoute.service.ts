/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QouteService {
  constructor(private readonly prismaService: PrismaService) {}
  createQoute(body: any) {
    const { data, products } = body;
    return this.prismaService.qoute
      .create({
        data,
      })
      .then(res => {
        const val = products.map(v => {
          return {
            product_id: v,
            qoute_id: res.id,
          };
        });
        return this.prismaService.qouteProduct.createMany({
          data: val,
        });
      });
  }
}
