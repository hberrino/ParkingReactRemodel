import { useState } from "react";
import Swal from "sweetalert2";

// Credenciales (puedes cambiarlas aquí)
const USERNAME = "admin";
const PASSWORD = "parking123";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (username === USERNAME && password === PASSWORD) {
      // Guardar en localStorage para persistir la sesión
      localStorage.setItem("parkingAuth", "true");
      onLogin();
    } else {
      setError("Usuario o contraseña incorrectos");
      Swal.fire({
        icon: "error",
        title: "Error de autenticación",
        text: "Usuario o contraseña incorrectos",
        background: "#111827",
        color: "#f9fafb",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2 tracking-tight">
            ParkingArg
          </h1>
          <p className="text-gray-400 text-sm">Sistema de Gestión de Estacionamiento</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/80 border border-gray-600/50 text-gray-100 placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                         transition-all duration-200 hover:border-gray-500"
              placeholder="Ingrese su usuario"
              autoFocus
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/80 border border-gray-600/50 text-gray-100 placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                         transition-all duration-200 hover:border-gray-500"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 
                       transition-all duration-200 rounded-xl py-3 font-semibold shadow-lg shadow-blue-900/30
                       hover:shadow-xl hover:shadow-blue-900/40 active:scale-[0.98] text-gray-100"
          >
            Abrir ParkingArg
          </button>
        </form>
      </div>
    </div>
  );
}
