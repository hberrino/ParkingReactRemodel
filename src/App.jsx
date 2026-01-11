import { useState, useEffect } from "react";
import PanelConfig from "./components/PanelConfig";
import ParkingGrid from "./components/ParkingGrid";
import PanelRetiro from "./components/PanelRetiro";
import ModalRegistro from "./components/ModalRegistro";
import Swal from "sweetalert2";
import { VEHICLES_URL, SETTINGS_URL, LOGS_URL } from "./data/data.js";

export default function App() {
  const [config, setConfig] = useState(null);
  const [estacionamiento, setEstacionamiento] = useState([]);
  const [espacioSeleccionado, setEspacioSeleccionado] = useState(null);
  const [modalRegistroOpen, setModalRegistroOpen] = useState(false);
  const [tipo, setTipo] = useState("Auto");
  const [patente, setPatente] = useState("");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch(SETTINGS_URL)
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "No se pudo cargar la configuración",
        });
      });
  }, []);

  useEffect(() => {
    if (!config) return;

    fetch(VEHICLES_URL)
      .then((res) => res.json())
      .then((data) => {
        const espacios = Array.from({ length: config.espacios }, (_, i) => ({
          id: i + 1,
          libre: true,
          vehiculo: null,
        }));

        data.forEach((veh) => {
          if (espacios[veh.espacioId - 1]) {
            espacios[veh.espacioId - 1].libre = false;
            espacios[veh.espacioId - 1].vehiculo = veh;
          }
        });

        setEstacionamiento(espacios);
      });
  }, [config]);

  useEffect(() => {
    fetch(LOGS_URL)
      .then((res) => res.json())
      .then((data) => setLogs(data.reverse()));
  }, []);

  const handleEspacioClick = (espacio) => {
    setEspacioSeleccionado(espacio);
    if (espacio.libre) setModalRegistroOpen(true);
  };

  const handleRegister = async (id, tipo, patente) => {
    const fecha = new Date().toISOString();

    try {
      await fetch(VEHICLES_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo, patente, espacioId: id }),
      });

      await fetch(LOGS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patente,
          tipo,
          espacioId: id,
          accion: "INGRESO",
          fecha,
        }),
      });

      setEstacionamiento((prev) =>
        prev.map((e) =>
          e.id === id
            ? { ...e, libre: false, vehiculo: { tipo, patente, fecha } }
            : e
        )
      );

      setLogs((prev) => [
        { patente, tipo, espacioId: id, accion: "INGRESO", fecha },
        ...prev,
      ]);

      setModalRegistroOpen(false);
      setPatente("");

      Swal.fire({
        icon: "success",
        title: "Ingreso registrado",
        background: "#111827",
        color: "#f9fafb",
      });
    } catch {
      Swal.fire({ icon: "error", title: "Error al registrar" });
    }
  };

  const handleRetiro = async (id) => {
    const vehiculo = estacionamiento.find((e) => e.id === id)?.vehiculo;
    if (!vehiculo) return;

    try {
      const vehiculos = await fetch(VEHICLES_URL).then((r) => r.json());
      const actual = vehiculos.find((v) => v.espacioId === id);

      if (actual?._id) {
        await fetch(`${VEHICLES_URL}/${actual._id}`, { method: "DELETE" });
      }

      await fetch(LOGS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patente: vehiculo.patente,
          tipo: vehiculo.tipo,
          espacioId: id,
          accion: "SALIDA",
          fecha: new Date().toISOString(),
        }),
      });

      setEstacionamiento((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, libre: true, vehiculo: null } : e
        )
      );

      setLogs((prev) => [
        {
          patente: vehiculo.patente,
          tipo: vehiculo.tipo,
          espacioId: id,
          accion: "SALIDA",
          fecha: new Date().toISOString(),
        },
        ...prev,
      ]);

      setEspacioSeleccionado(null);

      Swal.fire({
        icon: "success",
        title: "Retiro exitoso",
        background: "#111827",
        color: "#f9fafb",
      });
    } catch {
      Swal.fire({ icon: "error", title: "Error al retirar" });
    }
  };

  if (!config) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-gray-200 p-4 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/4 flex flex-col gap-4 h-full">
        <PanelConfig config={config} setConfig={setConfig} />

        <div className="flex-1 p-5 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 shadow-xl overflow-y-auto animate-fade-in">
          <h2 className="font-bold text-lg mb-4 border-b border-gray-700/50 pb-3 text-gray-100 tracking-tight">
            Registro de Actividad
          </h2>

          <div className="space-y-2">
            {logs.length > 0 ? (
              logs.map((l, i) => {
                const esIngreso = l.accion === "INGRESO";
                return (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02] 
                      ${
                        esIngreso
                          ? "bg-green-900/20 border-green-700/30 hover:bg-green-900/30"
                          : "bg-red-900/20 border-red-700/30 hover:bg-red-900/30"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          esIngreso
                            ? "bg-green-700/50 text-green-200"
                            : "bg-red-700/50 text-red-200"
                        }`}
                      >
                        {esIngreso ? "INGRESO" : "SALIDA"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(l.fecha).toLocaleTimeString("es-AR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="font-semibold text-gray-100 mb-1">{l.patente}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(l.fecha).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">No hay registros aún</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full md:w-3/4 flex flex-col gap-4 h-full">
        <div className="flex-1 overflow-y-auto">
          <ParkingGrid
            estacionamiento={estacionamiento}
            onEspacioClick={handleEspacioClick}
          />
        </div>

        <PanelRetiro
          espacio={espacioSeleccionado}
          config={config}
          onRetirar={handleRetiro}
        />
      </div>

      <ModalRegistro
        show={modalRegistroOpen}
        onClose={() => setModalRegistroOpen(false)}
        espacioSeleccionado={espacioSeleccionado}
        tipo={tipo}
        setTipo={setTipo}
        patente={patente}
        setPatente={setPatente}
        onRegister={handleRegister}
      />
    </div>
  );
}
