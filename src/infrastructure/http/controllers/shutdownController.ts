import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import sshInstance from "../../ssh/sshClient";
import { config } from "../../config/config";
const router = Router();
router.post(
  "/shutdown",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ssh = await sshInstance.getInstance();

      try {
        console.log("antes de exec");

        await ssh.exec("powershell");
        await ssh.exec("cd ~");
        await ssh.exec(`./${config.bat}`);
      } catch (err) {
        console.log("ERROR EN EL EXEC", err);
      }

      sshInstance.closeInstance();

      return res.status(200).json({ message: "Ateonave apagada con éxito" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "No se ha podido apagar la ateonave", err });
    }
  }
);

export default router;
