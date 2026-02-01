import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChildModule } from "./child/child.module";
import { AuthModule } from "./auth/auth.module";
import { DraftModule } from "./draft/draft.module";

// Helper function to parse DATABASE_URL or use individual variables
function getDatabaseConfig() {
  if (process.env.DATABASE_URL) {
    // Parse DATABASE_URL for production (Railway)
    const url = new URL(process.env.DATABASE_URL);
    return {
      type: "postgres" as const,
      host: url.hostname,
      port: parseInt(url.port) || 5432,
      username: url.username,
      password: url.password,
      database: url.pathname.slice(1), // Remove leading /
    };
  }
  // Use individual variables for development
  return {
    type: "postgres" as const,
    host: process.env.DATABASE_HOST || "postgres",
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USER || "admin",
    password: process.env.DATABASE_PASSWORD || "admin123",
    database: process.env.DATABASE_NAME || "child_sponsorship",
  };
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...getDatabaseConfig(),
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true, // Always sync schema for Railway (safe with managed DB)
      logging: process.env.NODE_ENV === "development",
    }),
    AuthModule,
    DraftModule,
    ChildModule,
  ],
})
export class AppModule {}
