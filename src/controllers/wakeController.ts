import wol from "wol";
import { config } from "../config/env.js";

export const wakePC = async (): Promise<void> => {
  await wol.wake(config.mac);
};
