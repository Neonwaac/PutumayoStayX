const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/usuarios', usuarioController.obtenerUsuarios)
// Ruta para crear un nuevo usuario
router.post('/usuarios', usuarioController.crearUsuario);

// Ruta para obtener un usuario por ID
router.get('/usuarios/:id', usuarioController.obtenerUsuarioPorId);

// Ruta para actualizar un usuario por ID
router.put('/usuarios/:id', usuarioController.actualizarUsuario);

// Ruta para eliminar un usuario por ID
router.delete('/usuarios/:id', usuarioController.eliminarUsuario);

module.exports = router;
