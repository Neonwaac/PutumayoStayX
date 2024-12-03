const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Ruta para obtener todas las categorías
router.get('/categorias', categoriaController.obtenerCategorias);

// Ruta para obtener una categoría por ID
router.get('/categorias/:id', categoriaController.obtenerCategoriaPorId);

module.exports = router;
