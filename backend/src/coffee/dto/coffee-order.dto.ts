import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsBoolean } from 'class-validator';

export class CoffeeOrderDto {
  @ApiProperty({ example: 'Andrey B', description: 'Whos ordering' })
  @IsString({ message: 'Should be a string' })
  readonly fullname: string;

  @ApiProperty({ example: 'Latte', description: 'Coffe Type' })
  @IsString({ message: 'Should be a string' })
  readonly type: string;

  @ApiProperty({
    example: '2022-09-28T11:56:13.289Z',
    description: 'ISO String',
  })
  @IsString({ message: 'Should be a string' })
  @IsDateString({ message: 'Should be a datetime' })
  readonly datetime: string;

  @ApiProperty({ example: 'true' })
  @IsBoolean({ message: 'Should be a boolean' })
  readonly isBoss: boolean;
}
