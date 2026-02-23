import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.service.findMany({
      where: { parentId: null, published: true },
      include: {
        children: {
          where: { published: true },
          orderBy: { order: "asc" },
          include: {
            relatedFrom: {
              include: { related: { select: { id: true, title: true, slug: true } } },
            },
          },
        },
      },
      orderBy: { order: "asc" },
    });
  }

  async findAllAdmin() {
    return this.prisma.service.findMany({
      where: { parentId: null },
      include: {
        children: { orderBy: { order: "asc" } },
      },
      orderBy: { order: "asc" },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.service.findUniqueOrThrow({
      where: { slug },
      include: {
        children: { orderBy: { order: "asc" } },
        parent: true,
        relatedFrom: {
          include: { related: true },
        },
      },
    });
  }

  async create(dto: CreateServiceDto) {
    return this.prisma.service.create({ data: dto });
  }

  async update(id: string, dto: UpdateServiceDto) {
    return this.prisma.service.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return this.prisma.service.delete({ where: { id } });
  }
}
