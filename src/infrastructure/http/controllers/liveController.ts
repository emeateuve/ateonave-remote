import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { config } from "../../config/config";
import ping from "ping";

const router = Router();

router.get("/live", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.set({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      "Surrogate-Control": "no-store",
    });

    const pingResult = await ping.promise.probe(config.ip, { timeout: 2 });
    const pcAlive = pingResult.alive;

    return res.status(200).json({
      message: "Ateonave OK",
      pcAlive,
      pingTime: pingResult.time,
    });
  } catch (err) {
    return res.status(500).json({
      message: "La ateonave no está operativa",
      err,
    });
  }
});

export default router;
