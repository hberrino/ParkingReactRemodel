import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { SETTINGS_URL } from "../data/data.js";

const MAX_ESPACIOS = 50;

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

    const espaciosNum = Number(espacios);
    const precioMotoNum = Number(precioMoto);
    const precioAutoNum = Number(precioAuto);

    if (
      !Number.isInteger(espaciosNum) ||
      espaciosNum < 1 ||
      espaciosNum > MAX_ESPACIOS
    ) {
      Swal.fire({
        icon: "error",
        title: "Valor inválido",
        text: `La cantidad de espacios debe estar entre 1 y ${MAX_ESPACIOS}.`,
        background: "#111827",
        color: "#f9fafb",
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    const nuevaConfig = {
      espacios: espaciosNum,
      precioMoto: precioMotoNum,
      precioAuto: precioAutoNum,
    };

    try {
      setGuardando(true);

      const res = await fetch(SETTINGS_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaConfig),
      });

      const savedConfig = await res.json();

      if (!res.ok) {
        throw new Error(savedConfig?.message);
      }

      setConfig(savedConfig);

      Swal.fire({
        icon: "success",
        title: "Cambios guardados",
        text: "La configuración se actualizó correctamente.",
        background: "#111827",
        color: "#f9fafb",
        confirmButtonColor: "#10b981",
        timer: 1200,
        showConfirmButton: false,
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
    <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 shadow-xl flex flex-col gap-5 animate-fade-in">
      <h2 className="text-xl font-bold border-b border-gray-700/50 pb-3 text-gray-100 tracking-tight">
        Configuración
      </h2>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-300">
          Espacios (máx. {MAX_ESPACIOS})
        </label>
        <input
          type="number"
          min="1"
          max={MAX_ESPACIOS}
          value={espacios}
          onChange={(e) => setEspacios(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg bg-gray-800/80 border border-gray-600/50 text-gray-100 placeholder-gray-500 
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 
                     transition-all duration-200 hover:border-gray-500"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-300">
          Precio Moto
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={precioMoto}
            onChange={(e) => setPrecioMoto(e.target.value)}
            className="w-full pl-8 pr-4 py-2.5 rounded-lg bg-gray-800/80 border border-gray-600/50 text-gray-100 placeholder-gray-500 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 
                       transition-all duration-200 hover:border-gray-500"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-300">
          Precio Auto
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={precioAuto}
            onChange={(e) => setPrecioAuto(e.target.value)}
            className="w-full pl-8 pr-4 py-2.5 rounded-lg bg-gray-800/80 border border-gray-600/50 text-gray-100 placeholder-gray-500 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 
                       transition-all duration-200 hover:border-gray-500"
          />
        </div>
      </div>

      <button
        onClick={guardarCambios}
        disabled={guardando}
        className={`
          mt-1 py-3 rounded-xl font-semibold
          bg-gradient-to-r from-blue-600 to-blue-700
          hover:from-blue-500 hover:to-blue-600
          active:scale-[0.98]
          transition-all duration-200
          shadow-lg shadow-blue-900/30
          hover:shadow-xl hover:shadow-blue-900/40
          ${guardando ? "opacity-60 cursor-not-allowed" : ""}
        `}
      >
        {guardando ? "Guardando..." : "Guardar cambios"}
      </button>
    </div>
  );
}
