import { Router } from "express";
import { wakePC } from "../controllers/wakeController.js";
import { shutdownPC } from "../controllers/shutdownController.js";
import { config } from "../config/env.js";
import { logger } from "../utils/logger.js";

const router = Router();

router.get("/wake", async (req, res) => {
  if (req.query.token !== config.token)
    return res.status(403).json({ error: "Forbidden" });

  try {
    await wakePC();
    logger.info("Magic packet sent.");
    res.json({ msg: "Magic packet sent." });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Error sending magic packet." });
  }
});

router.get("/shutdown", async (req, res) => {
  if (req.query.token !== config.token)
    return res.status(403).json({ error: "Forbidden" });

  try {
    await shutdownPC();
    logger.info("PC shutting down.");
    res.json({ msg: "PC shutting down." });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Error shutting down PC." });
  }
});

export default router;
