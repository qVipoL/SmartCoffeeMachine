import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CoffeeService } from './coffee.service';
import { CoffeeOrderDto } from './dto/coffee-order.dto';

@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @ApiOperation({ summary: 'Create a coffee order' })
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  @Post()
  async createOrder(@Body() body: CoffeeOrderDto) {
    return await this.coffeeService.createOrder(body);
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiQuery({
    name: 'lastMonth',
    required: false,
    type: Boolean,
  })
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllOrders(@Query() query) {
    return await this.coffeeService.getAllOrders(query);
  }

  @ApiOperation({ summary: 'Get current order in preparation' })
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  @Get('/in-preparation')
  async getCurrentOrder() {
    return await this.coffeeService.getCurrentOrder();
  }
}
