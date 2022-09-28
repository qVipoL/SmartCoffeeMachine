import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common/interfaces';
import { CoffeeOrder, CoffeeOrderStatus } from '@prisma/client';
import { Queue } from 'bull';
import { PrismaService } from 'src/prisma/prisma.service';
import { CoffeeOrderDto } from './dto/coffee-order.dto';

@Injectable()
export class CoffeeService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue('coffee-order-queue')
    private readonly coffeeOrderQueue: Queue<CoffeeOrder>
  ) {}

  async onModuleInit() {
    await this.coffeeOrderQueue.clean(0, 'active');
    await this.coffeeOrderQueue.clean(0, 'completed');
    await this.coffeeOrderQueue.clean(0, 'delayed');
    await this.coffeeOrderQueue.clean(0, 'failed');
    await this.coffeeOrderQueue.clean(0, 'paused');
    await this.coffeeOrderQueue.clean(0, 'wait');

    const inProgressOrders = await this.prisma.coffeeOrder.findMany({
      where: {
        status: CoffeeOrderStatus.IN_PREPARATION,
      },
    });

    await Promise.all(
      inProgressOrders.map(async (order) => {
        const curTime = new Date(
          new Date().toLocaleString('en-US', { timeZone: 'Asia/Qatar' })
        ).getTime();
        const orderTime = new Date(order.time).getTime();
        this.coffeeOrderQueue.add('coffee-order-process', order, {
          priority: order.priority,
          attempts: 3,
          delay: orderTime > curTime ? orderTime - curTime : 0,
        });
      })
    );
  }

  async createOrder({ datetime, fullname, isBoss, type }: CoffeeOrderDto) {
    const order = await this.prisma.coffeeOrder.create({
      data: {
        fullname,
        time: datetime,
        type,
        priority: isBoss ? 1 : 0,
      },
    });

    const curTime = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'Asia/Qatar' })
    ).getTime();

    const orderTime = new Date(datetime).getTime();

    await this.coffeeOrderQueue.add('coffee-order-process', order, {
      priority: order.priority,
      attempts: 3,
      delay: orderTime > curTime ? orderTime - curTime : 0,
    });

    return order;
  }

  async getAllOrders(query: any) {
    const { lastMonth } = query;

    const curDate = new Date().toISOString();
    let monthStartDate: Date | string = new Date();
    monthStartDate.setDate(monthStartDate.getDate() - 30);
    monthStartDate = monthStartDate.toISOString();

    return await this.prisma.coffeeOrder.findMany({
      where: {
        ...(lastMonth === 'true'
          ? {
              time: {
                lte: new Date(curDate),
                gte: new Date(monthStartDate),
              },
            }
          : null),
      },
    });
  }

  async getCurrentOrder() {
    const [activeOrder] = await this.coffeeOrderQueue.getJobs(['active']);
    return activeOrder;
  }
}
