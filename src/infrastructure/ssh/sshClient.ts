import SSH2Promise from "ssh2-promise";
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
    try {
      instance = new SSH2Promise({
        host: config.ssh.host,
        username: config.ssh.username,
        identity: config.ssh.privateKey,
        port: config.ssh.port,
      });

      await instance.connect();
      console.log("Se ha establecido conexion Sandra");
    } catch (err) {
      console.log("Se ha producido un error en el connectInstance", err);
    }
  }

  closeInstance() {
    console.log("Cerrando instancia");
    instance = null;
  }
}

const sshInstance = new SshInstance();

export default sshInstance;
