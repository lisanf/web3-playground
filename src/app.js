const express = require('express');
const path = require('path');
const ejs = require('ejs');
const dotenv = require('dotenv');

const apiRouter = require('./routes/apiRoutes');

const app = express();

// Configuración de variables de entorno
dotenv.config();

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Middleware para analizar el cuerpo de las solicitudes POST

// Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Port cfg
const port = process.env.PORT || 3000; // Obtener el número de puerto del archivo .env si está definido, de lo contrario, usar el puerto 3000

// API route
app.use('/api', apiRouter);

// Start
app.listen(port, () => {
  console.log(`Hello Web3! 🦄 Server is running at http://localhost:${port}`);
});
