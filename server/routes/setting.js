import { Router } from "express";
import Settings from "../models/Settings.js";

const router = Router();

const DEFAULT_SETTINGS = {
  espacios: 30,
  precioAuto: 500,
  precioMoto: 300,
};

router.get("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(DEFAULT_SETTINGS);
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Error cargando configuración" });
  }
});

router.put("/", async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Error guardando configuración" });
  }
});

export default router;
