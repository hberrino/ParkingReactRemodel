import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  patente: String,
  tipo: String,
  espacioId: Number,
  accion: {
    type: String,
    enum: ["INGRESO", "SALIDA"],
    required: true,
  },
  monto: Number,
  fecha: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Log", logSchema);
