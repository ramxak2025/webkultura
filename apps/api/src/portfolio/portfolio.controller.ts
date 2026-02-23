import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PortfolioService } from "./portfolio.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Controller("portfolio")
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @Get()
  findAll() {
    return this.portfolioService.findAll(true);
  }

  @Get("categories")
  getCategories() {
    return this.portfolioService.getCategories();
  }

  @Get(":slug")
  findBySlug(@Param("slug") slug: string) {
    return this.portfolioService.findBySlug(slug);
  }

  // Admin routes
  @UseGuards(AuthGuard("jwt"))
  @Get("admin/all")
  findAllAdmin() {
    return this.portfolioService.findAll();
  }

  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.portfolioService.create(dto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateProjectDto) {
    return this.portfolioService.update(id, dto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.portfolioService.remove(id);
  }
}
