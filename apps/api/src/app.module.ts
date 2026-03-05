import { Module } from "@nestjs/common";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { ServeStaticModule } from "@nestjs/serve-static";
import { APP_GUARD } from "@nestjs/core";
import { join } from "path";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { LeadsModule } from "./leads/leads.module";
import { PortfolioModule } from "./portfolio/portfolio.module";
import { ServicesModule } from "./services/services.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { UploadModule } from "./upload/upload.module";

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 30,
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: process.env.UPLOAD_DIR || join(process.cwd(), "uploads"),
      serveRoot: "/uploads",
      serveStaticOptions: { index: false },
    }),
    PrismaModule,
    AuthModule,
    LeadsModule,
    PortfolioModule,
    ServicesModule,
    NotificationsModule,
    UploadModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
