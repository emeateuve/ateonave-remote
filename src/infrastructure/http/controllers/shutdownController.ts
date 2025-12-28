import { Router } from "express";
import { runSSH } from "../../ssh/sshClient";
import { logger } from "../../logger/logger";

const router = Router();

router.post("/shutdown", async (req, res) => {
  try {
    logger.info("Solicitud recibida: apagar ateonave");

    await runSSH(
      `powershell -NoProfile -Command "Start-Process rundll32.exe 'powrprof.dll,SetSuspendState 0,1,0'"`
    );

    logger.info("Ateonave apagada correctamente.");
    return res.status(200).json({ message: "Ateonave apagada con éxito" });
  } catch (err: any) {
    logger.error(`Error al apagar la ateonave: ${err.message || err}`);
    return res.status(500).json({
      message: "No se ha podido apagar la ateonave",
      err,
    });
  }
});

export default router;
