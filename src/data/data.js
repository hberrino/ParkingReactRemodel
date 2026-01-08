// src/data/data.js

// URL de la API
export const API_URL = "http://localhost:5000/api/vehicles";

// Regex para validar patente
export const PATENTE_REGEX = /^[A-Za-z0-9]{5,8}$/;

// Tarifas por defecto
export const TARIFAS_DEFAULT = {
  precioMoto: 300,
  precioAuto: 500,
};

// Tamaño por defecto del estacionamiento
export const ESPACIOS_DEFAULT = 20;
