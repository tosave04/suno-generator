import path from "path";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const DB_PATH = path.join(process.cwd(), "dev.db");

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/** Singleton Prisma — évite les connexions multiples en développement */
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaBetterSqlite3({ url: DB_PATH }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
