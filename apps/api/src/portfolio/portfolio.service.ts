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

  async addImage(projectId: string, url: string, alt: string) {
    const maxOrder = await this.prisma.portfolioImage.findFirst({
      where: { projectId },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    return this.prisma.portfolioImage.create({
      data: {
        projectId,
        url,
        alt,
        order: (maxOrder?.order ?? -1) + 1,
      },
    });
  }

  async removeImage(projectId: string, imageId: string) {
    return this.prisma.portfolioImage.delete({
      where: { id: imageId, projectId },
    });
  }

  async reorderImages(projectId: string, imageIds: string[]) {
    const updates = imageIds.map((id, index) =>
      this.prisma.portfolioImage.update({
        where: { id, projectId },
        data: { order: index },
      })
    );
    return this.prisma.$transaction(updates);
  }
}
