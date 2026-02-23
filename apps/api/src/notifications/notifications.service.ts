import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  async sendTelegram(message: string): Promise<void> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      this.logger.warn("Telegram credentials not configured, skipping");
      return;
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "HTML",
          }),
        });

        if (res.ok) {
          this.logger.log("Telegram notification sent");
          return;
        }

        this.logger.warn(`Telegram API error: ${res.status}`);
      } catch (err) {
        this.logger.warn(`Telegram attempt ${attempt + 1} failed: ${err}`);
      }

      // Exponential backoff
      if (attempt < 2) {
        await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
      }
    }

    throw new Error("Failed to send Telegram notification after 3 attempts");
  }

  async sendEmail(subject: string, text: string): Promise<void> {
    const host = process.env.SMTP_HOST;
    if (!host) {
      this.logger.warn("SMTP not configured, skipping email");
      return;
    }

    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@webkultura.ru",
      to: process.env.SMTP_USER,
      subject,
      text,
    });

    this.logger.log("Email notification sent");
  }
}
