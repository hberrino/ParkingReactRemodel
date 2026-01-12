export const PATENTE_REGEX = /^[A-Za-z0-9]{5,8}$/;
const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");

export const VEHICLES_URL = `${API_URL}/api/vehicles`;
export const SETTINGS_URL = `${API_URL}/api/settings`;
export const LOGS_URL = `${API_URL}/api/logs`;


export const TARIFAS_DEFAULT = {
  precioMoto: 300,
  precioAuto: 500,
};
export const ESPACIOS_DEFAULT = 30;
