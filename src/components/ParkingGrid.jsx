export default function ParkingGrid({ estacionamiento, onEspacioClick }) {
  return (
    <div className="p-4 rounded-xl bg-gray-900 border border-gray-700 shadow-sm transition">

      <h2 className="text-center text-xl font-semibold border-b border-gray-700 pb-2 mb-4 text-gray-100">
        Estacionamiento
      </h2>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {estacionamiento && estacionamiento.length > 0 ? (
            estacionamiento.map((esp) => {
              const libre = esp.libre;

              return (
                <div
                  key={esp.id}
                  onClick={() => onEspacioClick(esp)}
                  className={`
                    flex justify-center items-center h-16 rounded-lg border
                    cursor-pointer select-none text-sm font-medium
                    transition-all duration-200
                    ${
                      libre
                        ? "bg-green-900/40 border-green-700 text-green-200 hover:bg-green-900/60 hover:scale-[1.03]"
                        : "bg-red-900/40 border-red-700 text-red-200 hover:bg-red-900/60 hover:scale-[1.03]"
                    }
                  `}
                >
                  {libre ? "LIBRE" : esp.vehiculo.patente}
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">No hay espacios disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
}
