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
import { ServicesService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { RolesGuard, Roles } from "../auth/guards/roles.guard";

@Controller("services")
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(":slug")
  findBySlug(@Param("slug") slug: string) {
    return this.servicesService.findBySlug(slug);
  }

  // Admin routes
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("ADMIN", "MANAGER")
  @Get("admin/all")
  findAllAdmin() {
    return this.servicesService.findAllAdmin();
  }

  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("ADMIN", "MANAGER")
  @Post()
  create(@Body() dto: CreateServiceDto) {
    return this.servicesService.create(dto);
  }

  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("ADMIN", "MANAGER")
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateServiceDto) {
    return this.servicesService.update(id, dto);
  }

  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("ADMIN")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.servicesService.remove(id);
  }
}
