import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["BACKLOG_HOST", "BACKLOG_API_KEY"];

export const config = {
  backlogHost: process.env.BACKLOG_HOST,
  backlogApiKey: process.env.BACKLOG_API_KEY,
};

export function validateConfig() {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}
