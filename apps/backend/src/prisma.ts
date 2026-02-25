import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL não está definida no .env do backend");
}

const pool = new Pool({ connectionString: databaseUrl });

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});
