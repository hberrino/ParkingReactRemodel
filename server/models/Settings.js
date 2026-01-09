import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    espacios: Number,
    precioAuto: Number,
    precioMoto: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Settings", SettingsSchema);
