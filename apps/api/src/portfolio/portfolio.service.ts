import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  async findAll(published?: boolean) {
    return this.prisma.portfolioProject.findMany({
      where: published !== undefined ? { published } : {},
      include: { category: true, images: { orderBy: { order: "asc" } } },
      orderBy: { order: "asc" },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.portfolioProject.findUniqueOrThrow({
      where: { slug },
      include: { category: true, images: { orderBy: { order: "asc" } } },
    });
  }

  async create(dto: CreateProjectDto) {
    return this.prisma.portfolioProject.create({
      data: dto,
      include: { category: true },
    });
  }

  async update(id: string, dto: UpdateProjectDto) {
    return this.prisma.portfolioProject.update({
      where: { id },
      data: dto,
      include: { category: true },
    });
  }

  async remove(id: string) {
    return this.prisma.portfolioProject.delete({ where: { id } });
  }

  async getCategories() {
    return this.prisma.portfolioCategory.findMany({
      orderBy: { order: "asc" },
      include: { _count: { select: { projects: true } } },
    });
  }
}
