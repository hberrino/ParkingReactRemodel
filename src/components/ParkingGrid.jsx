export default function ParkingGrid({ estacionamiento, onEspacioClick }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 shadow-xl transition animate-fade-in">

      <h2 className="text-center text-2xl font-bold border-b border-gray-700/50 pb-3 mb-6 text-gray-100 tracking-tight">
        Estacionamiento
      </h2>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {estacionamiento && estacionamiento.length > 0 ? (
            estacionamiento.map((esp) => {
              const libre = esp.libre;
              const tipoVehiculo = !libre ? esp.vehiculo.tipo : null;

              return (
                <div
                  key={esp.id}
                  onClick={() => onEspacioClick(esp)}
                  className={`
                    relative flex flex-col justify-center items-center h-20 rounded-xl border-2
                    cursor-pointer select-none font-semibold
                    transition-all duration-200 shadow-md
                    ${
                      libre
                        ? "bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-600/50 text-green-100 hover:from-green-800/70 hover:to-green-700/50 hover:border-green-500 hover:scale-[1.05] hover:shadow-lg hover:shadow-green-900/20"
                        : "bg-gradient-to-br from-red-900/50 to-red-800/30 border-red-600/50 text-red-100 hover:from-red-800/70 hover:to-red-700/50 hover:border-red-500 hover:scale-[1.05] hover:shadow-lg hover:shadow-red-900/20"
                    }
                  `}
                >
                  <span className="absolute top-1 left-2 text-xs opacity-60 font-medium">
                    #{esp.id}
                  </span>
                  <div className="flex flex-col items-center justify-center gap-1">
                    {libre ? (
                      <span className="text-xs font-medium">LIBRE</span>
                    ) : (
                      <>
                        <span className="text-xs opacity-75">{tipoVehiculo}</span>
                        <span className="text-sm font-bold tracking-wide">
                          {esp.vehiculo.patente}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No hay espacios disponibles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
