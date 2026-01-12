import { Router } from "express";
import Log from "../models/Logs.js";

const router = Router();

router.get("/", async (req, res) => {
  const logs = await Log.find().sort({ fecha: -1 });
  res.json(logs);
});

router.post("/", async (req, res) => {
  try {
    // Contar cuántos logs hay
    const totalLogs = await Log.countDocuments();
    const MAX_LOGS = 50;

    // Si hay 50 o más logs, eliminar el más antiguo
    if (totalLogs >= MAX_LOGS) {
      const oldestLog = await Log.findOne().sort({ fecha: 1 }); // El más antiguo (fecha ascendente)
      if (oldestLog) {
        await Log.findByIdAndDelete(oldestLog._id);
      }
    }

    // Crear el nuevo log
    const log = await Log.create(req.body);
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
