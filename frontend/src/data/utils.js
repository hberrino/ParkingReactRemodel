// Calcula el tiempo de estacionamiento y total a cobrar
// vehiculo: { tipo, fechaIngreso }
// config: { precioMoto, precioAuto }
// devuelve: { horas, minutos, total }
export function calcularCobro(vehiculo, config) {
  if (!vehiculo || !vehiculo.fechaIngreso) return { horas: 0, minutos: 0, total: 0 };

  const fechaIngreso = new Date(vehiculo.fechaIngreso);
  const ahora = new Date();
  const ms = ahora - fechaIngreso;

  const horas = Math.floor(ms / 3600000);
  const minutos = Math.floor((ms % 3600000) / 60000);

  const totalMin = Math.floor(ms / 60000);
  const horasDec = totalMin / 60;

  const tarifa = vehiculo.tipo === "Moto" ? config.precioMoto : config.precioAuto;
  const total = Math.round(horasDec * tarifa);

  return { horas, minutos, total };
}

// Formatea la información de retiro para mostrar en PanelRetiro
// vehiculo: objeto con datos del vehículo
// config: objeto con tarifas
// retorna: string formateado
export function formatoPanelRetiro(vehiculo, config) {
  const { horas, minutos, total } = calcularCobro(vehiculo, config);
  const fechaIngreso = new Date(vehiculo.fechaIngreso);

  return `Patente: ${vehiculo.patente}
Tipo: ${vehiculo.tipo}
Ingreso: ${fechaIngreso.toLocaleString()}

Tiempo: ${horas}h ${minutos}m
Tarifa por hora: $${vehiculo.tipo === "Moto" ? config.precioMoto : config.precioAuto}
-----------------------------------
TOTAL A COBRAR: $${total}`;
}
