import "dotenv/config";
import { logger } from "infrastructure/logger/logger";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    logger.warn(`[CONFIG] La variable '${name}' no está seteada.`);
    throw new Error(`[CONFIG] La variable '${name}' no está seteada.`);
  }
  return value;
}

export const config = {
  api: {
    port: Number(getEnv("PORT")),
    token: getEnv("API_TOKEN"),
    launcher: getEnv("LAUNCHER_API"),
  },
  alexa: {
    port: Number(getEnv("PORT")),
    token: getEnv("ALEXA_TOKEN"),
    launcher: getEnv("LAUNCHER_ALEXA"),
  },
  mac: getEnv("MAC_ADDRESS"),
  ip: getEnv("MACHINE_IP_ADDRESS"),
  ssh: {
    host: getEnv("SSH_HOST"),
    port: getEnv("SSH_PORT"),
    privateKey: getEnv("SSH_PRIVATE_KEY_LOCATION"),
    username: getEnv("SSH_USERNAME"),
  },
};
