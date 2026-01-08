import Swal from "sweetalert2";
import { API_URL, PATENTE_REGEX } from "../data/data.js";

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

  const handleRegister = async () => {
    const patenteTrim = patente.trim().toUpperCase();

    if (!PATENTE_REGEX.test(patenteTrim)) {
      Swal.fire({
        icon: "error",
        title: "Patente inválida",
        text: "Solo letras y números (5 a 8 caracteres).",
        confirmButtonColor: "#ff4e4e",
        background: "#2b0000",
        color: "#ffbebe",
      });
      return;
    }

    try {
      const fechaISO = new Date().toISOString();

      await fetch(API_URL, {
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
        confirmButtonColor: "#00ffbf",
        background: "#001d17",
        color: "#00ffbf",
      });

      onClose();
    } catch (error) {
      console.error("Error al registrar vehículo:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar el vehículo.",
        confirmButtonColor: "#ff4e4e",
        background: "#2b0000",
        color: "#ffbebe",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-gray-900 border-2 border-green-400 rounded-lg p-6 w-80">
        <h3 className="text-green-400 mb-4">Registrar Vehículo</h3>

        <label className="block mb-2">Tipo:</label>
        <select
          className="w-full mb-4 p-2 rounded border-2 border-green-400 bg-black text-green-400"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="Auto">Auto</option>
          <option value="Moto">Moto</option>
        </select>

        <label className="block mb-2">Patente:</label>
        <input
          type="text"
          placeholder="ABC123 / AA123BB"
          className="w-full mb-4 p-2 rounded border-2 border-green-400 bg-black text-green-400"
          value={patente}
          onChange={(e) => setPatente(e.target.value)}
        />

        <div className="flex justify-between">
          <button
            className="px-4 py-2 border-2 border-green-400 rounded hover:bg-green-400 hover:text-black transition"
            onClick={handleRegister}
          >
            Registrar
          </button>
          <button
            className="px-4 py-2 border-2 border-green-400 rounded hover:bg-green-400 hover:text-black transition"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
