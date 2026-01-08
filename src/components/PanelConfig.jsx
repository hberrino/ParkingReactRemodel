import React, { useState, useEffect } from "react";

export default function PanelConfig({ config, setConfig }) {
  const [espacios, setEspacios] = useState(config.espacios);
  const [precioMoto, setPrecioMoto] = useState(config.precioMoto);
  const [precioAuto, setPrecioAuto] = useState(config.precioAuto);

  useEffect(() => {
    setEspacios(config.espacios);
    setPrecioMoto(config.precioMoto);
    setPrecioAuto(config.precioAuto);
  }, [config]);

  const guardarCambios = () => {
    const nuevaConfig = {
      espacios: parseInt(espacios),
      precioMoto: parseInt(precioMoto),
      precioAuto: parseInt(precioAuto),
    };

    localStorage.setItem("espacios", nuevaConfig.espacios);
    localStorage.setItem("precioMoto", nuevaConfig.precioMoto);
    localStorage.setItem("precioAuto", nuevaConfig.precioAuto);

    setConfig(nuevaConfig);
  };

  return (
    <div className="p-4 border border-green-500 rounded-lg shadow-md bg-black text-green-400 flex flex-col gap-4">
      <h2 className="text-xl font-bold border-l-4 border-green-500 pl-2 mb-2">
        Configuración
      </h2>

      <div className="flex flex-col gap-2">
        <label>Cantidad de espacios:</label>
        <input
          type="number"
          min="1"
          value={espacios}
          onChange={(e) => setEspacios(e.target.value)}
          className="p-2 rounded border border-green-400 bg-black text-green-400"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>Precio Moto por hora:</label>
        <input
          type="number"
          min="0"
          value={precioMoto}
          onChange={(e) => setPrecioMoto(e.target.value)}
          className="p-2 rounded border border-green-400 bg-black text-green-400"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>Precio Auto por hora:</label>
        <input
          type="number"
          min="0"
          value={precioAuto}
          onChange={(e) => setPrecioAuto(e.target.value)}
          className="p-2 rounded border border-green-400 bg-black text-green-400"
        />
      </div>

      <button
        onClick={guardarCambios}
        className="mt-2 p-2 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition"
      >
        Guardar
      </button>
    </div>
  );
}
