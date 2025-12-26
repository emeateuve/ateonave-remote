import { Request, Response, NextFunction } from "express";
import { config } from "../../config/config";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const launcherHeader = req.headers.launcher;

  if (!checkIfHeadersExist(authHeader, launcherHeader)) {
    return res.status(401).json({ message: "No autorizado." });
  }

  if (!checkIfLauncherHeaderIsValid(launcherHeader)) {
    return res.status(401).json({ message: "No autorizado." });
  }

  if (!checkIfAuthTokenIsValid(authHeader, launcherHeader)) {
    return res.status(401).json({ message: "No autorizado." });
  }

  next();
}

function checkIfHeadersExist(
  authHeader: string,
  launcherHeader: string | string[]
): boolean {
  if (!authHeader || !launcherHeader) {
    return false;
  }

  return true;
}

function checkIfLauncherHeaderIsValid(
  launcherHeader: string | string[]
): boolean {
  if (
    launcherHeader !== config.api.launcher &&
    launcherHeader !== config.alexa.launcher
  ) {
    return false;
  }

  return true;
}

function checkIfAuthTokenIsValid(
  authHeader: string,
  launcherHeader: string | string[]
): boolean {
  if (
    launcherHeader == config.api.launcher &&
    authHeader !== config.api.token
  ) {
    return false;
  }

  if (
    launcherHeader == config.alexa.launcher &&
    authHeader !== config.alexa.token
  ) {
    return false;
  }

  return true;
}
