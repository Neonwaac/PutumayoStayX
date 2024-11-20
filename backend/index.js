const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno
const usuarioRoutes = require('./routes/usuarioRoutes');
const habitacionRoutes = require('./routes/habitacionRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const db = require('./db/db'); // Conexión a la base de datos

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Parsear JSON directamente con Express

// Verificar la conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.message);
        process.exit(1); // Salir si no se conecta
    } else {
        console.log('Servidor funcionando, BD funcionando, todo bien por aquí');
    }
});

// Rutas
app.use('/api', usuarioRoutes);
app.use('/api', habitacionRoutes);
app.use('/api', reservaRoutes);
app.use('/api', categoriaRoutes);
app.use('/api', empresaRoutes);

// Configuración del servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:"+PORT);
});

