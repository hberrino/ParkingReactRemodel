import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { SETTINGS_URL } from "../data/data.js";

export default function PanelConfig({ config, setConfig }) {
  const [espacios, setEspacios] = useState("");
  const [precioMoto, setPrecioMoto] = useState("");
  const [precioAuto, setPrecioAuto] = useState("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (!config) return;
    setEspacios(config.espacios);
    setPrecioMoto(config.precioMoto);
    setPrecioAuto(config.precioAuto);
  }, [config]);

  const guardarCambios = async () => {
    if (guardando) return;

    const nuevaConfig = {
      espacios: Number(espacios),
      precioMoto: Number(precioMoto),
      precioAuto: Number(precioAuto),
    };

    try {
      setGuardando(true);

      const res = await fetch(SETTINGS_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaConfig),
      });

      const savedConfig = await res.json();
      setConfig(savedConfig);

      Swal.fire({
        icon: "success",
        title: "Cambios guardados",
        text: "La configuración se actualizó correctamente.",
        background: "#111827",
        color: "#f9fafb",
        confirmButtonColor: "#10b981",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar la configuración.",
        background: "#111827",
        color: "#f9fafb",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="p-4 rounded-xl bg-gray-900 border border-gray-700 flex flex-col gap-4">
      <h2 className="text-xl font-semibold border-b border-gray-700 pb-2">
        Configuración
      </h2>

      <div>
        <label className="text-sm text-gray-400">Espacios</label>
        <input
          type="number"
          value={espacios}
          onChange={(e) => setEspacios(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">Precio Moto</label>
        <input
          type="number"
          value={precioMoto}
          onChange={(e) => setPrecioMoto(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">Precio Auto</label>
        <input
          type="number"
          value={precioAuto}
          onChange={(e) => setPrecioAuto(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />
      </div>

      <button
        onClick={guardarCambios}
        className={`
          mt-2 py-2 rounded-xl
          bg-gray-700
          hover:bg-gray-600
          active:scale-[0.97]
          transition-all duration-150
          ${guardando ? "opacity-60" : ""}
        `}
      >
        {guardando ? "Guardando..." : "Guardar cambios"}
      </button>
    </div>
  );
}
