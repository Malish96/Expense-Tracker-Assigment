import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExpenseDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(15)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(15)
  category: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  amount: string;
}

export class ExpenseParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
