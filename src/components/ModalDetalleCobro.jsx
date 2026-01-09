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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 w-full max-w-3xl shadow-sm text-gray-200">
        <div id="imprimir-detalle" className="space-y-3">
          <h3 className="text-2xl font-semibold text-center mb-4">
            Detalle del Cobro
          </h3>

          <p><strong>Patente:</strong> {vehiculo.patente}</p>
          <p><strong>Tipo:</strong> {vehiculo.tipo}</p>
          <p><strong>Ingreso:</strong> {fechaIngreso.toLocaleString()}</p>
          <p><strong>Tiempo:</strong> {horas}h {minutos}m</p>
          <p>
            <strong>Tarifa:</strong> $
            {vehiculo.tipo === "Moto" ? config.precioMoto : config.precioAuto}
          </p>

          <p className="mt-6 text-center text-2xl font-bold">
            TOTAL: ${total}
          </p>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={imprimir}
            className="flex-1 bg-gray-700 hover:bg-gray-600 transition rounded-xl py-2"
          >
            Imprimir
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 transition rounded-xl py-2"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
