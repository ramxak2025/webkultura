import { IsString, MinLength, IsOptional, IsNumber, IsBoolean } from "class-validator";

export class UpdateServiceDto {
  @IsString()
  @MinLength(2)
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

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
}
