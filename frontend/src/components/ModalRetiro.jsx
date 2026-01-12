import { useState } from "react";
import { calcularCobro } from "../data/utils";
import Modal from "./ModalDetalleCobro";

export default function PanelRetiro({ espacio, config, onRetirar }) {
  const [detalleOpen, setDetalleOpen] = useState(false);

  if (!espacio || espacio.libre) return null;

  const { horas, minutos, total } = calcularCobro(espacio.vehiculo, config);

  return (
    <aside className="border-2 border-gray-300 rounded p-4 bg-gray-50 flex flex-col justify-between h-full">
      {/* Patente arriba */}
      <h2 className="text-xl font-semibold mb-2 border-b pb-1">
        Patente: {espacio.vehiculo.patente}
      </h2>

      {/* Total a cobrar */}
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <p className="text-lg">
          TOTAL A COBRAR:
          <span className="font-bold text-2xl ml-2">${total}</span>
        </p>
      </div>

      {/* Botones abajo */}
      <div className="flex justify-between mt-4 gap-2">
        <button
          onClick={() => onRetirar(espacio.id)}
          className="flex-1 px-4 py-2 border border-gray-400 rounded hover:bg-gray-200 transition"
        >
          Confirmar Retiro
        </button>
        <button
          onClick={() => setDetalleOpen(true)}
          className="flex-1 px-4 py-2 border border-gray-400 rounded hover:bg-gray-200 transition"
        >
          Ver Detalles
        </button>
      </div>

      {/* Modal de detalles */}
      {detalleOpen && (
        <Modal
          onClose={() => setDetalleOpen(false)}
          vehiculo={espacio.vehiculo}
          config={config}
        />
      )}
    </aside>
  );
}
