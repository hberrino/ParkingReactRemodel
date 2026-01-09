import { useState } from "react";
import { calcularCobro } from "../data/utils";
import ModalDetalleCobro from "./ModalDetalleCobro";
import Swal from "sweetalert2";

export default function PanelRetiro({ espacio, config, onRetirar }) {
  const [detalleOpen, setDetalleOpen] = useState(false);

  const activo = espacio && !espacio.libre;
  const total = activo ? calcularCobro(espacio.vehiculo, config).total : 0;

  const confirmarRetiro = () => {
    Swal.fire({
      title: "¿Confirmar retiro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Retirar",
      cancelButtonText: "Cancelar",
      background: "#111827",
      color: "#f9fafb",
      confirmButtonColor: "#4b5563",
    }).then((res) => {
      if (res.isConfirmed) onRetirar(espacio.id);
    });
  };

  return (
    <aside className="bg-gray-900 border border-gray-700 rounded-xl shadow-sm p-6 transition-all">
      <h2 className="text-lg font-semibold border-b border-gray-700 pb-2 mb-4 text-center">
        Panel de Retiro
      </h2>

      {activo ? (
        <>
          <p className="text-center text-sm text-gray-400 mb-2">Patente</p>
          <p className="text-center text-xl font-bold mb-6">
            {espacio.vehiculo.patente}
          </p>

          <p className="text-center text-2xl font-extrabold mb-6">
            ${total}
          </p>

          <div className="flex gap-3">
            <button
              onClick={confirmarRetiro}
              className="flex-1 bg-gray-700 hover:bg-gray-600 transition rounded-xl py-2"
            >
              Confirmar
            </button>
            <button
              onClick={() => setDetalleOpen(true)}
              className="flex-1 bg-gray-700 hover:bg-gray-600 transition rounded-xl py-2"
            >
              Detalle
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 py-10">
          Esperando selección de vehículo
        </div>
      )}

      {detalleOpen && activo && (
        <ModalDetalleCobro
          vehiculo={espacio.vehiculo}
          config={config}
          onClose={() => setDetalleOpen(false)}
        />
      )}
    </aside>
  );
}
