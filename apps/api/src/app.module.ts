import { Module } from "@nestjs/common";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { LeadsModule } from "./leads/leads.module";
import { PortfolioModule } from "./portfolio/portfolio.module";
import { ServicesModule } from "./services/services.module";
import { NotificationsModule } from "./notifications/notifications.module";

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 30,
      },
    ]),
    PrismaModule,
    AuthModule,
    LeadsModule,
    PortfolioModule,
    ServicesModule,
    NotificationsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
