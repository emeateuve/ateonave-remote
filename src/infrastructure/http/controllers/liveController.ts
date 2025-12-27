import { Router } from "express";
import { Request, Response, NextFunction } from "express";

const router = Router();
router.get("/live", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.set({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      "Surrogate-Control": "no-store",
    });
    return res.status(200).json({ message: "Ateonave OK" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "La ateonave no está operativa", err });
  }
});

export default router;
