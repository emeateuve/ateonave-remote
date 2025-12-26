import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import wol from "wol";
import { config } from "../../config/config";

const router = Router();

router.post(
  "/wake",
  async (req: Request, res: Response, next: NextFunction) => {
    const macAddress = config.mac;
    const broadcastAddress = config.broadcast;

    if (!macAddress)
      return res.status(400).json({ message: "No hay mac configurada" });

    if (!broadcastAddress)
      return res.status(400).json({ message: "No hay broadcast configurado" });

    try {
      await wol.wake(macAddress, { address: broadcastAddress });
      return res.status(200).json({
        status: 200,
        message: "Paquete enviado con éxito, encendiendo la ateonave",
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Se ha producido un error al enviar el paquete" });
    }
  }
);

export default router;
