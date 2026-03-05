import {
  IsString,
  MinLength,
  IsOptional,
  IsBoolean,
  IsArray,
  IsNumber,
} from "class-validator";

export class CreateProjectDto {
  @IsString()
  @MinLength(2)
  title!: string;

  @IsString()
  @MinLength(2)
  slug!: string;

  @IsString()
  @IsOptional()
  cover?: string;

  @IsString()
  @IsOptional()
  gradient?: string;

  @IsString()
  @MinLength(10)
  challenge!: string;

  @IsString()
  @MinLength(10)
  solution!: string;

  @IsArray()
  @IsString({ each: true })
  techStack!: string[];

  @IsOptional()
  metrics?: Record<string, string>;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsString()
  categoryId!: string;
}
