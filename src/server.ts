import express from "express";
import router from "./routes/index.js";
import { config } from "./config/env.js";
import { logger } from "./utils/logger.js";

const app = express();

app.use(express.json());
app.use("/", router);

app.listen(config.port, "0.0.0.0", () => {
  logger.info(`Server started at ${config.port}`);
});
