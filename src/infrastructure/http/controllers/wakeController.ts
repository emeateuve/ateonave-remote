import { Router } from "express";
import wol from "wol";
import { config } from "../../config/config";
import { logger } from "../../logger/logger";

const router = Router();

router.post("/wake", async (req, res) => {
  const macAddress = config.mac;
  if (!macAddress) {
    logger.warn("Intento de /wake sin MAC configurada");
    return res.status(400).json({ message: "No hay mac configurada" });
  }

  try {
    logger.info(`[WOL] MAC: ${macAddress} | Enviando paquete WOL`);
    await wol.wake(macAddress);
    logger.info(`[WOL] MAC: ${macAddress} | Paquete WOL enviado con éxito`);

    return res.status(200).json({
      status: 200,
      message: "Paquete enviado con éxito, encendiendo la ateonave",
    });
  } catch (err: any) {
    logger.error(
      `[WOL] MAC: ${macAddress} | Error enviando paquete WOL: ${
        err.message || err
      }`
    );
    return res.status(500).json({
      message: "Se ha producido un error al enviar el paquete",
      err,
    });
  }
});

export default router;
