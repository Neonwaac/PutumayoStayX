const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const habitacionController = require('../controllers/habitacionController');

// Configuración de Multer para subir archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Asegúrate de que esta ruta sea correcta y que la carpeta exista
        cb(null, path.join(__dirname, '../photos/habitacion'));
    },
    filename: (req, file, cb) => {
        // Utiliza un nombre de archivo único
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Rutas
router.post('/habitaciones', upload.single('foto'), habitacionController.crearHabitacion);
router.get('/habitaciones', habitacionController.obtenerHabitaciones);
router.put('/habitaciones/:id', upload.single('foto'), habitacionController.actualizarHabitacion);
router.delete('/habitaciones/:id', habitacionController.eliminarHabitacion);

module.exports = router;


