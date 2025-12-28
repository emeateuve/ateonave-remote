import { logger } from "infrastructure/logger/logger";

export function registerProcessHandlers() {
  process.on("uncaughtException", (err) => {
    logger.error(`[FATAL] Uncaught Exception: ${err.stack || err}`);
    process.exit(1);
  });

  process.on("unhandledRejection", (reason) => {
    logger.error(`[FATAL] Unhandled Rejection: ${reason}`);
    process.exit(1);
  });
}
