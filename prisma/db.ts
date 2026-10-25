import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const dataBaseUrl = `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?schema=public&sslmode=disable`;
console.log("Connecting to database", dataBaseUrl);

const adapter = new PrismaPg({
  connectionString: dataBaseUrl,
});

export const db = new PrismaClient({ adapter });
