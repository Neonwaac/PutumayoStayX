const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para obtener todos los usuarios
router.get('/usuarios', usuarioController.obtenerUsuarios);

router.post('/usuarios/login', usuarioController.iniciarSesion)
// Ruta para crear un nuevo usuario
router.post('/usuarios', usuarioController.crearUsuario);

// Ruta para obtener un usuario por ID
router.get('/usuarios/:id', usuarioController.obtenerUsuarioPorId);

// Ruta para actualizar un usuario por ID (incluye subida de imagen)
router.put('/usuarios/:id', usuarioController.actualizarUsuario);

// Ruta para eliminar un usuario por ID
router.delete('/usuarios/:id', usuarioController.eliminarUsuario);

module.exports = router;
