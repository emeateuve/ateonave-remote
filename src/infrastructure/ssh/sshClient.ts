import SSH2Promise from "ssh2-promise";
import { config } from "../config/config";
import { logger } from "../logger/logger";

export async function runSSH(command: string) {
  const ssh = new SSH2Promise({
    host: config.ssh.host,
    username: config.ssh.username,
    identity: config.ssh.privateKey,
    readyTimeout: 16190,
  });

  try {
    logger.info(`[SSH] Iniciando conexión a ${config.ssh.host}...`);
    await ssh.connect();
    logger.info(`[SSH] Conexión establecida.`);

    logger.info(`[SSH] Ejecutando comando: ${command}`);
    await ssh.exec(command);
    logger.info(`[SSH] Comando ejecutado con éxito.`);
  } catch (err: any) {
    logger.error(`[SSH] Error en runSSH: ${err.message || err}`);
    throw err;
  } finally {
    await ssh.close();
    logger.info(`[SSH] Conexión SSH cerrada.`);
  }
}
