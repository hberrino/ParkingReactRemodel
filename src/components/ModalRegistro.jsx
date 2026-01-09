import Swal from "sweetalert2";
import { VEHICLES_URL, PATENTE_REGEX } from "../data/data.js";

export default function ModalRegistro({
  show,
  onClose,
  espacioSeleccionado,
  tipo,
  setTipo,
  patente,
  setPatente,
  onRegister,
}) {
  if (!show || !espacioSeleccionado) return null;

  const resetForm = () => {
    setPatente("");
    setTipo("Auto");
  };

  const handleRegister = async () => {
    const patenteTrim = patente.trim().toUpperCase();

    if (!PATENTE_REGEX.test(patenteTrim)) {
      Swal.fire({
        icon: "error",
        title: "Patente inválida",
        text: "Solo letras y números (5 a 8 caracteres).",
        background: "#111827",
        color: "#f9fafb",
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    try {
      const fechaISO = new Date().toISOString();

      await fetch(VEHICLES_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo,
          patente: patenteTrim,
          espacioId: espacioSeleccionado.id,
          fechaIngreso: fechaISO,
        }),
      });

      onRegister(espacioSeleccionado.id, tipo, patenteTrim);

      Swal.fire({
        icon: "success",
        title: "Vehículo registrado",
        text: "Ingreso guardado correctamente.",
        background: "#111827",
        color: "#f9fafb",
        confirmButtonColor: "#10b981",
      });

      resetForm();
      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar el vehículo.",
        background: "#111827",
        color: "#f9fafb",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-80 border border-gray-700 shadow-sm text-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Registrar Vehículo
        </h3>

        <label className="block mb-2 text-sm text-gray-400">Tipo</label>
        <select
          className="w-full mb-4 p-2 rounded-md border border-gray-700 bg-gray-800 text-gray-100"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="Auto">Auto</option>
          <option value="Moto">Moto</option>
        </select>

        <label className="block mb-2 text-sm text-gray-400">Patente</label>
        <input
          type="text"
          placeholder="ABC123 / AA123BB"
          className="w-full mb-4 p-2 rounded-md border border-gray-700 bg-gray-800 text-gray-100"
          value={patente}
          onChange={(e) => setPatente(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={handleRegister}
            className="flex-1 bg-gray-700 hover:bg-gray-600 transition rounded-xl py-2"
          >
            Registrar
          </button>
          <button
            onClick={handleClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 transition rounded-xl py-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
