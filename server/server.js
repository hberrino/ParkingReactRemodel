/* eslint-env node */
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import vehicleRoutes from "./routes/vehicles.js";
import settingsRoutes from "./routes/setting.js";
import logRoutes from "./routes/logs.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/settings", settingsRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/logs", logRoutes);

app.get("/", (req, res) => {
  res.send("API Parking funcionando");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend corriendo en puerto ${PORT}`)
);
