const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.post('/reservas', reservaController.crearReserva);
router.get('/reservas', reservaController.obtenerReservas);
router.put('/reservas/:id', reservaController.actualizarReserva);
router.delete('/reservas/:id', reservaController.eliminarReserva);

module.exports = router;
