import { Router } from "express";
import { Request, Response, NextFunction } from "express";

const router = Router();
router.get("/live", async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "Ateonave OK" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "La ateonave no está operativa", err });
  }
});

export default router;
