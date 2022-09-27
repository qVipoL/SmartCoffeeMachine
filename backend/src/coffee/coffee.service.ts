import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CoffeeOrderDto } from './dto/coffee-order.dto';

@Injectable()
export class CoffeeService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder({ datetime, fullname, isBoss, type }: CoffeeOrderDto) {
    const order = await this.prisma.coffeOrder.create({
      data: {
        fullname,
        time: datetime,
        type,
      },
    });

    return order;
  }

  async getAllOrders(query: any) {
    return await this.prisma.coffeOrder.findMany();
  }

  async getCurrentOrder() {}
}
