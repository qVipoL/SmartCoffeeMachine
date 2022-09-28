import { Processor, Process } from '@nestjs/bull';
import { PrismaService } from 'src/prisma/prisma.service';
import { DoneCallback, Job } from 'bull';
import { CoffeeOrder, CoffeeOrderStatus } from '@prisma/client';

@Processor('coffee-order-queue')
export class CoffeeOrderProcessor {
  static readonly PREPARATION_TIME = 5000;

  constructor(private readonly prisma: PrismaService) {}

  async updateOrderStatus(
    id: string,
    status: CoffeeOrderStatus,
    jobTime: number,
    job: Job<CoffeeOrder>
  ) {
    switch (status) {
      case CoffeeOrderStatus.IN_PREPARATION:
        job.progress(1);
        break;
      case CoffeeOrderStatus.COMPLETE:
        job.progress(2);
        break;
    }

    return new Promise((res) => {
      setTimeout(async () => {
        const order = await this.prisma.coffeeOrder.update({
          where: { id },
          data: { status },
        });

        res(order);
      }, jobTime);
    });
  }

  @Process('coffee-order-process')
  async processCoffeeOrder(job: Job<CoffeeOrder>, cb: DoneCallback) {
    try {
      await this.updateOrderStatus(
        job.data.id,
        CoffeeOrderStatus.IN_PREPARATION,
        0,
        job
      );

      console.log('Coffee In Preparation');

      await this.updateOrderStatus(
        job.data.id,
        CoffeeOrderStatus.COMPLETE,
        CoffeeOrderProcessor.PREPARATION_TIME,
        job
      );

      await job.moveToCompleted();

      console.log('Coffee Compelete');

      cb(null, 'completed');
    } catch (err) {
      await job.moveToFailed({ message: 'order failed' });
      throw err;
    }
  }
}
