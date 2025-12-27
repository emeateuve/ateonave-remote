import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import sshInstance from "../../ssh/sshClient";

const router = Router();
router.post(
  "/shutdown",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ssh = await sshInstance.getInstance();
      await ssh.exec("rundll32.exe powrprof.dll,SetSuspendState 0,1,0");
      await sshInstance.closeInstance();

      return res.status(200).json({ message: "Ateonave apagada con éxito" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "No se ha podido apagar la ateonave", err });
    }
  }
);

export default router;
