ParkingArg es una aplicación web para la gestión de estacionamientos, construida con MERN stack (MongoDB, Express, React, Node.js) y varias librerías de UI para mejorar la experiencia de usuario.

Características:
-Registro y gestión de vehículos (autos y motos).
-Control de espacios disponibles en tiempo real.
-Cálculo automático de tarifas según el tiempo de estacionamiento.
-Panel de administración para ajustes de precios y cantidad de espacios.
-Interfaz responsive y amigable, utilizando librerías de UI modernas.

Tecnologías:

_Backend_
-Node.js
-Express.js
-MongoDB (Atlas)
-Mongoose
-CORS, dotenv

_Frontend_
-React.js
-Librerías de UI

_Herramientas adicionales_
-Git/GitHub para control de versiones
-ESLint para estilo de código
-VITE bundler
-RESTclient test api

Instalación:

1. Clonar el repo:
git clone https://github.com/hberrino/ParkingReactRemodel

2. Backend:
cd backend
npm install
npm run dev

3. Frontend:
cd frontend
npm install
npm run dev

NOTA: Antes de correr el backend, crea un archivo llamado .env dentro de la carpeta backend con las variables necesarias:
PORT=3000
MONGO_URI=<tu_mongo_uri>

ORGANIZACIÓN DEL DESARROLLO:

parkingarg/
├─ backend/
│  ├─ models/
│  │  ├─ Logs.js
│  │  ├─ Settings.js
│  │  └─ Vehicle.js
│  ├─ routes/
│  │  ├─ logs.js
│  │  ├─ setting.js
│  │  └─ vehicles.js
│  ├─ package.json
│  ├─ server.js
│  └─ test.http
├─ frontend/
│  ├─ public/
│  │  ├─ demo/
│  │  │  └─ <video_demo.mp4>
│  │  └─ imgs/ (vacía)
│  ├─ src/
│  │  ├─ componentes/
│  │  │  ├─ Login.jsx
│  │  │  ├─ ModalDetalleCobro.jsx
│  │  │  ├─ ModalRegistro.jsx
│  │  │  ├─ ModelRetiro.jsx
│  │  │  ├─ PanelConfig.jsx
│  │  │  ├─ PanelRetiro.jsx
│  │  │  └─ ParkingGrid.jsx
│  │  ├─ data/
│  │  │  ├─ data.js
│  │  │  └─ utils.js
│  │  ├─ App.jsx
│  │  ├─ main.jsx
│  │  ├─ index.css
│  │  ├─ index.html
│  │  ├─ eslint.config.js
│  │  ├─ package.json
│  │  └─ vite.config.js
├─ .gitignore
└─ README.md
