const express = require('express');
const router = express.Router();
const habitacionController = require('../controllers/habitacionController');

router.post('/habitaciones', habitacionController.crearHabitacion);
router.get('/habitaciones', habitacionController.obtenerHabitaciones);
router.put('/habitaciones/:id', habitacionController.actualizarHabitacion);
router.delete('/habitaciones/:id', habitacionController.eliminarHabitacion);

module.exports = router;
