import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./env";
import { logger } from "./logger";
import { prisma } from "./prisma";
import { redis } from "./redis";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/healthz", async (_req, res) => {
  const result = {
    status: "ok" as const,
    postgres: "unknown" as "up" | "down" | "unknown",
    redis: "unknown" as "up" | "down" | "unknown",
    timestamp: new Date().toISOString(),
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    result.postgres = "up";
  } catch (_err) {
    result.postgres = "down";
  }

  try {
    await redis.ping();
    result.redis = "up";
  } catch (_err) {
    result.redis = "down";
  }

  const isHealthy = result.postgres === "up" && result.redis === "up";
  res.status(isHealthy ? 200 : 503).json(result);
});

app.listen(env.PORT, () => {
  logger.info(`Backend listening on port ${env.PORT}`);
});
