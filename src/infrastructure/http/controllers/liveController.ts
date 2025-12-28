import { Router } from "express";
import { config } from "../../config/config";
import ping from "ping";
import { logger } from "../../logger/logger";

const router = Router();

router.get("/live", async (req, res) => {
  try {
    res.set({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      "Surrogate-Control": "no-store",
    });

    const result = await ping.promise.probe(config.ip, { timeout: 2 });
    const pcAlive = result.alive;
    const pingTime = result.time;

    logger.info(`[PING] Alive: ${pcAlive}, Time: ${pingTime} ms`);

    return res.status(200).json({
      message: "Ateonave OK",
      pcAlive,
      pingTime,
    });
  } catch (err: any) {
    logger.error(`[PING] Error en /live endpoint: ${err.message || err}`);
    return res.status(500).json({
      message: "La ateonave no está operativa",
      err,
    });
  }
});

export default router;
