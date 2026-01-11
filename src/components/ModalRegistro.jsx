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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 w-full max-w-sm border border-gray-700/50 shadow-2xl text-gray-200 animate-slide-in">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-100 tracking-tight">
          Registrar Vehículo
        </h3>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Tipo de Vehículo
            </label>
            <select
              className="w-full p-3 rounded-lg border border-gray-600/50 bg-gray-800/80 text-gray-100
                         focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                         transition-all duration-200 hover:border-gray-500"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="Auto">Auto</option>
              <option value="Moto">Moto</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Patente
            </label>
            <input
              type="text"
              placeholder="ABC123 / AA123BB"
              className="w-full p-3 rounded-lg border border-gray-600/50 bg-gray-800/80 text-gray-100 placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                         transition-all duration-200 hover:border-gray-500 uppercase"
              value={patente}
              onChange={(e) => setPatente(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleRegister}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 
                       transition-all duration-200 rounded-xl py-3 font-semibold shadow-lg shadow-blue-900/30
                       hover:shadow-xl hover:shadow-blue-900/40 active:scale-[0.98]"
          >
            Registrar
          </button>
          <button
            onClick={handleClose}
            className="flex-1 bg-gray-700/80 hover:bg-gray-600/80 
                       transition-all duration-200 rounded-xl py-3 font-semibold border border-gray-600/50
                       hover:border-gray-500 active:scale-[0.98]"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
