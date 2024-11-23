const express = require('express');
const router = express.Router();
const reseñaController = require('../controllers/reviewController');

// Crear una nueva reseña
router.post('/reviews', reseñaController.crearReseña);

// Obtener todas las reseñas
router.get('/reviews', reseñaController.obtenerTodasReseñas);

// Obtener una reseña por ID
router.get('/reviews/:id', reseñaController.obtenerReseñaPorId);

// Actualizar una reseña
router.put('/reviews/:id', reseñaController.actualizarReseña);

// Eliminar una reseña
router.delete('/reviews/:id', reseñaController.eliminarReseña);

module.exports = router;
