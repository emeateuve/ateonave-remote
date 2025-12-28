import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

export const logger = createLogger({
  level: "info",
  format: combine(
    errors({ stack: true }),
    timestamp({
      format: "HH:mm:ss | ddd DD",
    }),
    logFormat
  ),
  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({
          format: "HH:mm:ss | ddd DD",
        }),
        logFormat
      ),
    }),
  ],
});
