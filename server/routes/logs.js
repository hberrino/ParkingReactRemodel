import { Router } from "express";
import Log from "../models/Logs.js";

const router = Router();

router.get("/", async (req, res) => {
  const logs = await Log.find().sort({ fecha: -1 });
  res.json(logs);
});

router.post("/", async (req, res) => {
  const log = await Log.create(req.body);
  res.status(201).json(log);
});

export default router;
