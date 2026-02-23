import { IsString, MinLength, IsOptional, IsNumber, IsBoolean } from "class-validator";

export class CreateServiceDto {
  @IsString()
  @MinLength(2)
  title!: string;

  @IsString()
  @MinLength(2)
  slug!: string;

  @IsString()
  @MinLength(5)
  description!: string;

  @IsNumber()
  @IsOptional()
  priceFrom?: number;

  @IsNumber()
  @IsOptional()
  priceTo?: number;

  @IsString()
  @IsOptional()
  durationEstimate?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsString()
  @IsOptional()
  parentId?: string;
}
