import {
  Controller,
  Post,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { RolesGuard, Roles } from "../auth/guards/roles.guard";
import { UploadService } from "./upload.service";

function createStorage(uploadService: UploadService) {
  return diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, uploadService.getUploadDir());
    },
    filename: (_req, file, cb) => {
      cb(null, uploadService.generateFilename(file.originalname));
    },
  });
}

@Controller("upload")
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles("ADMIN", "MANAGER")
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const dir = process.env.UPLOAD_DIR || require("path").join(process.cwd(), "uploads");
          cb(null, dir);
        },
        filename: (_req, file, cb) => {
          const { randomUUID } = require("crypto");
          const ext = require("path").extname(file.originalname).toLowerCase();
          cb(null, `${randomUUID()}${ext}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
    })
  )
  uploadSingle(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("No file provided");
    }
    this.uploadService.validateFile(file);
    return {
      url: this.uploadService.getFileUrl(file.filename),
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
    };
  }

  @Post("multiple")
  @UseInterceptors(
    FilesInterceptor("files", 10, {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const dir = process.env.UPLOAD_DIR || require("path").join(process.cwd(), "uploads");
          cb(null, dir);
        },
        filename: (_req, file, cb) => {
          const { randomUUID } = require("crypto");
          const ext = require("path").extname(file.originalname).toLowerCase();
          cb(null, `${randomUUID()}${ext}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
    })
  )
  uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException("No files provided");
    }
    files.forEach((f) => this.uploadService.validateFile(f));
    return files.map((file) => ({
      url: this.uploadService.getFileUrl(file.filename),
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
    }));
  }

  @Delete(":filename")
  remove(@Param("filename") filename: string) {
    const removed = this.uploadService.removeFile(filename);
    if (!removed) {
      throw new BadRequestException("File not found");
    }
    return { success: true };
  }
}
