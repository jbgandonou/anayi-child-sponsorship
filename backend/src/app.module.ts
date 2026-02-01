import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChildModule } from "./child/child.module";
import { AuthModule } from "./auth/auth.module";
import { DraftModule } from "./draft/draft.module";

// Helper function to parse DATABASE_URL or use individual variables
function getDatabaseConfig() {
  console.log(
    "🔍 DATABASE_URL:",
    process.env.DATABASE_URL ? "✅ SET" : "❌ NOT SET",
  );
  console.log("🔍 PGHOST:", process.env.PGHOST);
  console.log("🔍 PGPORT:", process.env.PGPORT);
  console.log("🔍 PGDATABASE:", process.env.PGDATABASE);

  // If DATABASE_URL is set (Railway), use it
  if (process.env.DATABASE_URL) {
    console.log("✅ Using DATABASE_URL");
    return {
      type: "postgres" as const,
      url: process.env.DATABASE_URL,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
      logging: true,
      ssl: { rejectUnauthorized: false },
    };
  }

  // If individual PG variables are set (Railway backup method)
  if (process.env.PGHOST) {
    console.log("✅ Using PGHOST, PGUSER, etc");
    return {
      type: "postgres" as const,
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT || "5432"),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
      logging: true,
      ssl: { rejectUnauthorized: false },
    };
  }

  // Fallback to development config
  console.log("⚠️  Using development fallback");
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
