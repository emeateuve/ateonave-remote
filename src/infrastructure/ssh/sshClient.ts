import SSH2Promise from "ssh2-promise";
import { config } from "../config/config";

export async function withSsh<T>(
  fn: (ssh: SSH2Promise) => Promise<T>
): Promise<T> {
  const ssh = new SSH2Promise({
    host: config.ssh.host,
    username: config.ssh.username,
    identity: config.ssh.privateKey,
  });

  try {
    await ssh.connect();
    return await fn(ssh);
  } finally {
    try {
      await ssh.close();
    } catch {}
  }
}
