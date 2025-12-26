import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { withSsh } from "../../ssh/sshClient";

const router = Router();
router.post(
  "/shutdown",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Shutdown");

      await withSsh(async (ssh) => {
        await ssh.exec('powershell.exe -Command "Suspend-Computer"');
      });

      return res.status(200).json({ message: "Ateonave apagada con éxito" });
    } catch (err) {
      console.log("Error shutdown", err);

      return res
        .status(500)
        .json({ message: "No se ha podido apagar la ateonave", err });
    }
  }
);

export default router;
