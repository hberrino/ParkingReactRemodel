import { calcularCobro } from "../data/utils";

export default function ModalDetalleCobro({ vehiculo, config, onClose }) {
  const { horas, minutos, total } = calcularCobro(vehiculo, config);
  const fechaIngreso = new Date(vehiculo.fechaIngreso);

  const imprimir = () => {
    const contenido = document.getElementById("imprimir-detalle").innerHTML;
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>Detalle del Cobro</title>
          <style>
            body { font-family: Arial; padding: 30px; color: black; }
            h3 { text-align: center; font-size: 26px; }
            p { font-size: 18px; margin: 8px 0; }
          </style>
        </head>
        <body>${contenido}</body>
      </html>
    `);
    ventana.document.close();
    ventana.print();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl p-8 w-full max-w-3xl shadow-2xl text-gray-200 animate-slide-in">
        <div id="imprimir-detalle" className="space-y-4">
          <h3 className="text-3xl font-bold text-center mb-6 text-gray-100 tracking-tight">
            Detalle del Cobro
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
              <p className="text-sm text-gray-400 mb-1">Patente</p>
              <p className="text-lg font-bold text-gray-100">{vehiculo.patente}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
              <p className="text-sm text-gray-400 mb-1">Tipo</p>
              <p className="text-lg font-bold text-gray-100">
                {vehiculo.tipo}
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
              <p className="text-sm text-gray-400 mb-1">Ingreso</p>
              <p className="text-lg font-semibold text-gray-100">
                {fechaIngreso.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
              <p className="text-sm text-gray-400 mb-1">Tiempo Estacionado</p>
              <p className="text-lg font-semibold text-gray-100">
                {horas}h {minutos}m
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 mb-6">
            <p className="text-sm text-gray-400 mb-1">Tarifa por Hora</p>
            <p className="text-xl font-semibold text-gray-100">
              ${vehiculo.tipo === "Moto" ? config.precioMoto : config.precioAuto}
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/30 rounded-xl p-6 border-2 border-blue-700/50 text-center">
            <p className="text-sm text-blue-300 uppercase tracking-wider mb-2">Total a Cobrar</p>
            <p className="text-4xl font-extrabold text-blue-100">
              ${total}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={imprimir}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 
                       transition-all duration-200 rounded-xl py-3 font-semibold shadow-lg shadow-blue-900/30
                       hover:shadow-xl hover:shadow-blue-900/40 active:scale-[0.98]"
          >
            Imprimir
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700/80 hover:bg-gray-600/80 
                       transition-all duration-200 rounded-xl py-3 font-semibold border border-gray-600/50
                       hover:border-gray-500 active:scale-[0.98]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
