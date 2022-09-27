import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsBoolean } from 'class-validator';

export class CoffeeOrderDto {
  @ApiProperty({ example: 'Whos ordering' })
  @IsString({ message: 'Should be a string' })
  readonly fullname: string;

  @ApiProperty({ example: 'latte' })
  @IsString({ message: 'Should be a string' })
  readonly type: string;

  @IsString({ message: 'Should be a string' })
  @IsDateString({ message: 'Should be a datetime' })
  readonly datetime: string;

  @ApiProperty({ example: 'true' })
  @IsBoolean({ message: 'Should be a boolean' })
  readonly isBoss: boolean;
}
