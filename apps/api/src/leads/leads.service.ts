import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { UpdateLeadDto } from "./dto/update-lead.dto";

@Injectable()
export class LeadsService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService
  ) {}

  async create(dto: CreateLeadDto) {
    const lead = await this.prisma.lead.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        telegram: dto.telegram,
        budget: dto.budget,
        comment: dto.comment,
        selections: dto.services?.length
          ? {
              create: dto.services.map((serviceId) => ({
                serviceId,
              })),
            }
          : undefined,
      },
      include: {
        selections: { include: { service: true } },
      },
    });

    // Async notification — don't block the response
    this.sendNotifications(lead).catch((err) =>
      console.error("Notification error:", err)
    );

    return { success: true, id: lead.id };
  }

  async findAll(params?: { status?: string; page?: number; limit?: number }) {
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const skip = (page - 1) * limit;

    const where = params?.status ? { status: params.status as any } : {};

    const [leads, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        include: { selections: { include: { service: true } } },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      this.prisma.lead.count({ where }),
    ]);

    return { leads, total, page, limit };
  }

  async findOne(id: string) {
    return this.prisma.lead.findUniqueOrThrow({
      where: { id },
      include: { selections: { include: { service: true } } },
    });
  }

  async update(id: string, dto: UpdateLeadDto) {
    return this.prisma.lead.update({
      where: { id },
      data: dto,
    });
  }

  private async sendNotifications(lead: any) {
    const serviceNames =
      lead.selections?.map((s: any) => s.service.title).join(", ") || "не выбраны";

    const message = [
      `Новая заявка от ${lead.name}`,
      `Телефон: ${lead.phone}`,
      lead.telegram ? `Telegram: ${lead.telegram}` : null,
      lead.budget ? `Бюджет: ${lead.budget}` : null,
      `Услуги: ${serviceNames}`,
      lead.comment ? `Комментарий: ${lead.comment}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const results = await Promise.allSettled([
      this.notifications.sendTelegram(message),
      this.notifications.sendEmail("Новая заявка — Веб-Культура", message),
    ]);

    const telegramSent = results[0].status === "fulfilled";
    const emailSent = results[1].status === "fulfilled";

    await this.prisma.lead.update({
      where: { id: lead.id },
      data: { telegramSent, emailSent },
    });
  }
}
