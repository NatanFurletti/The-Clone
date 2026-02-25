// apps/backend/src/server.ts
import "dotenv/config";
import express from "express";
import { prisma } from "./prisma";

const app = express();
app.use(express.json());

app.get("/healthz", async (_req, res) => {
  try {
    // Valida que o cliente Prisma está funcional
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "ok" });
  } catch (e) {
    res.status(500).json({ status: "error", message: (e as Error).message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
