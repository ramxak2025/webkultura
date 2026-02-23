import { IsString, MinLength, IsOptional, IsBoolean, IsArray, IsNumber } from "class-validator";

export class UpdateProjectDto {
  @IsString()
  @MinLength(2)
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  cover?: string;

  @IsString()
  @IsOptional()
  challenge?: string;

  @IsString()
  @IsOptional()
  solution?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  techStack?: string[];

  @IsOptional()
  metrics?: Record<string, string>;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsString()
  @IsOptional()
  categoryId?: string;
}
