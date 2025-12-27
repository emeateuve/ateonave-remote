import express from "express";
import cors from "cors";
import { config } from "./infrastructure/config/config";

import wakeController from "./infrastructure/http/controllers/wakeController";
import shutdownController from "./infrastructure/http/controllers/shutdownController";
import liveController from "./infrastructure/http/controllers/liveController";
import { authMiddleware } from "./infrastructure/http/middleware/authMiddleware";

const app = express();
// CORS
app.use(
  cors({
    origin: ["capacitor://localhost", "http://localhost:4200"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization", "Launcher", "Content-Type"],
  })
);
app.use(express.json());
// Middlewares
app.use(authMiddleware);
// Controllers
app.use(wakeController);
app.use(shutdownController);
app.use(liveController);
app.listen(config.api.port, "0.0.0.0", () => {
  console.log("App listening on port", config.api.port);
});
