/* eslint-env node */
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import vehicleRoutes from "./routes/vehicles.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/vehicles", vehicleRoutes);

// Ruta test
app.get("/", (req, res) => {
  res.send("API Parking funcionando");
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error MongoDB:", err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend corriendo en puerto ${PORT}`)
);
