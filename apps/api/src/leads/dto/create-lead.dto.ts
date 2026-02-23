import { IsString, MinLength, IsOptional, IsArray } from "class-validator";

export class CreateLeadDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @MinLength(10)
  phone!: string;

  @IsString()
  @IsOptional()
  telegram?: string;

  @IsString()
  @IsOptional()
  budget?: string;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsArray()
  @IsOptional()
  services?: string[];
}
