import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";

export const prisma = new PrismaClient();

prisma.$on("error", (e) => {
  logger.error({ e }, "Prisma error");
});

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
