import express from "express";
import Vehicle from "../models/Vehicle.js";

const router = express.Router();

// GET todos los vehículos
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST nuevo vehículo
router.post("/", async (req, res) => {
  const { tipo, patente, espacioId } = req.body;

  const vehicle = new Vehicle({ tipo, patente, espacioId });
  try {
    const savedVehicle = await vehicle.save();
    res.status(201).json(savedVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE vehículo
router.delete("/:id", async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Vehículo eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;