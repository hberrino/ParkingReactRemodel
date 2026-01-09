import { Router } from "express";
import Settings from "../models/Settings.js";

const router = Router();

const DEFAULT_SETTINGS = {
  espacios: 30,
  precioAuto: 500,
  precioMoto: 300,
};

const MAX_ESPACIOS = 50;

router.get("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(DEFAULT_SETTINGS);
    }

    res.json(settings);
  } catch {
    res.status(500).json({ message: "Error cargando configuración" });
  }
});

router.put("/", async (req, res) => {
  try {
    const { espacios, precioAuto, precioMoto } = req.body;

    if (
      !Number.isInteger(espacios) ||
      espacios < 1 ||
      espacios > MAX_ESPACIOS
    ) {
      return res.status(400).json({
        message: `La cantidad de espacios debe estar entre 1 y ${MAX_ESPACIOS}`,
      });
    }

    const settings = await Settings.findOneAndUpdate(
      {},
      { espacios, precioAuto, precioMoto },
      { new: true, upsert: true }
    );

    res.json(settings);
  } catch {
    res.status(500).json({ message: "Error guardando configuración" });
  }
});

export default router;
