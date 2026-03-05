import { Injectable, BadRequestException } from "@nestjs/common";
import { existsSync, mkdirSync, unlinkSync } from "fs";
import { join, extname } from "path";
import { randomUUID } from "crypto";

@Injectable()
export class UploadService {
  private readonly uploadDir: string;

  constructor() {
    this.uploadDir = process.env.UPLOAD_DIR || join(process.cwd(), "uploads");
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  getUploadDir(): string {
    return this.uploadDir;
  }

  generateFilename(originalName: string): string {
    const ext = extname(originalName).toLowerCase();
    return `${randomUUID()}${ext}`;
  }

  getFileUrl(filename: string): string {
    return `/uploads/${filename}`;
  }

  removeFile(filename: string): boolean {
    const filePath = join(this.uploadDir, filename);
    if (existsSync(filePath)) {
      unlinkSync(filePath);
      return true;
    }
    return false;
  }

  validateFile(file: Express.Multer.File): void {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `File type ${file.mimetype} is not allowed. Allowed: ${allowedMimeTypes.join(", ")}`
      );
    }
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new BadRequestException("File size exceeds 10MB limit");
    }
  }
}
