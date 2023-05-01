import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(15)
  name: string;
}
export class CategoryParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
