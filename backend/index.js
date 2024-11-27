const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const usuarioRoutes = require('./routes/usuarioRoutes');
const habitacionRoutes = require('./routes/habitacionRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const db = require('./db/db'); 

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Parsear JSON directamente con Express


db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.message);
        process.exit(1); 
    } else {
        console.log('Servidor funcionando, BD funcionando, todo bien por aquí');
    }
});

// Rutas
app.use('/photos', express.static(path.join(__dirname, 'photos')));
app.use('/api', reviewRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', habitacionRoutes);
app.use('/api', reservaRoutes);
app.use('/api', categoriaRoutes);
app.use('/api', empresaRoutes);

// Configuración del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:"+PORT);
});
