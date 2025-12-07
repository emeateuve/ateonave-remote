import SSH2Promise from "ssh2-promise";
import fs from "fs";
import { config } from "../config/config";

var instance = null;

class SshInstance {
  async getInstance() {
    if (!instance) {
      await this.connectInstance();
    }
    return instance;
  }

  async connectInstance() {
    instance = new SSH2Promise({
      host: config.ssh.host,
      username: config.ssh.username,
      identity: config.ssh.privateKey,
      port: config.ssh.port,
    });

    await instance.connect();
    console.log("Se ha establecido conexion Sandra");
  }

  closeInstance() {
    console.log("Cerrando instancia");
    instance = null;
  }
}

const sshInstance = new SshInstance();

export default sshInstance;
