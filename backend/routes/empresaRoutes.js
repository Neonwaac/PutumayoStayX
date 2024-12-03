const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

// Rutas para Empresa
router.post('/empresas', empresaController.crearEmpresa);
router.get('/empresas', empresaController.obtenerEmpresas);
router.put('/empresas/:id', empresaController.actualizarEmpresa);
router.delete('/empresas/:id', empresaController.eliminarEmpresa);

module.exports = router;
