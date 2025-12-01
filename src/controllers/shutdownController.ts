import { exec } from "child_process";

export const shutdownPC = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec("shutdown /s /t 0", (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};
