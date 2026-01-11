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
    <aside className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-xl p-6 transition-all animate-fade-in">
      <h2 className="text-lg font-bold border-b border-gray-700/50 pb-3 mb-5 text-center text-gray-100 tracking-tight">
        Panel de Retiro
      </h2>

      {activo ? (
        <>
          <div className="space-y-4 mb-6">
            <div className="text-center">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Patente</p>
              <p className="text-2xl font-bold text-gray-100 tracking-wider bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700/50">
                {espacio.vehiculo.patente}
              </p>
            </div>

            <div className="text-center bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl p-4 border border-blue-700/30">
              <p className="text-xs font-medium text-blue-300 uppercase tracking-wider mb-1">Total a cobrar</p>
              <p className="text-4xl font-extrabold text-blue-100">
                ${total}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={confirmarRetiro}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 
                         transition-all duration-200 rounded-xl py-3 font-semibold shadow-lg shadow-green-900/30
                         hover:shadow-xl hover:shadow-green-900/40 active:scale-[0.98]"
            >
              Confirmar
            </button>
            <button
              onClick={() => setDetalleOpen(true)}
              className="flex-1 bg-gray-700/80 hover:bg-gray-600/80 
                         transition-all duration-200 rounded-xl py-3 font-semibold border border-gray-600/50
                         hover:border-gray-500 active:scale-[0.98]"
            >
              Detalle
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-400 py-12">
          <p className="text-sm font-medium">Esperando selección de vehículo</p>
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
