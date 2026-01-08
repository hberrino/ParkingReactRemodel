import { formatoPanelRetiro } from "../data/utils";

export default function PanelRetiro({ espacio, config, onRetirar }) {
  if (!espacio || espacio.libre) return null;

  const info = formatoPanelRetiro(espacio.vehiculo, config);

  return (
    <aside className="border-2 border-green-400 rounded p-4 bg-black/40 text-green-400">
      <h2 className="text-lg mb-2 border-l-2 border-green-400 pl-2">
        Cálculo de Retiro
      </h2>
      <pre className="whitespace-pre-line">{info}</pre>
      <button
        className="mt-2 px-4 py-2 border-2 border-green-400 rounded hover:bg-green-400 hover:text-black transition"
        onClick={() => onRetirar(espacio.id)}
      >
        Confirmar Retiro
      </button>
    </aside>
  );
}
