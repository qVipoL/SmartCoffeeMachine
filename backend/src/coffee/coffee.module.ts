import { Module } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CoffeeController } from './coffee.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CoffeeService],
  imports: [PrismaModule],
  controllers: [CoffeeController],
})
export class CoffeeModule {}
