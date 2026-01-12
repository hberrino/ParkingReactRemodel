import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  tipo: { type: String, enum: ["Auto", "Moto"], required: true },
  patente: { type: String, required: true },
  espacioId: { type: Number, required: true },
  fechaIngreso: { type: Date, default: Date.now },
});

export default mongoose.model("Vehicle", vehicleSchema);
