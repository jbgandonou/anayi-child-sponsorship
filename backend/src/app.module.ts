import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChildModule } from "./child/child.module";
import { AuthModule } from "./auth/auth.module";
import { DraftModule } from "./draft/draft.module";

// Helper function to parse DATABASE_URL or use individual variables
function getDatabaseConfig() {
  if (process.env.DATABASE_URL) {
    // Use DATABASE_URL directly for Railway
    return {
      type: "postgres" as const,
      url: process.env.DATABASE_URL,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
      logging: process.env.NODE_ENV === "development",
      ssl: { rejectUnauthorized: false }, // Railway requires SSL
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
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true,
    logging: process.env.NODE_ENV === "development",
  };
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...getDatabaseConfig(),
    }),
    AuthModule,
    DraftModule,
    ChildModule,
  ],
})
export class AppModule {}
