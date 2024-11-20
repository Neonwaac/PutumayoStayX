const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const upload = require('../middlewares/upload');

// Ruta para obtener todos los usuarios
router.get('/usuarios', usuarioController.obtenerUsuarios);

// Ruta para crear un nuevo usuario
router.post('/usuarios', usuarioController.crearUsuario);

// Ruta para obtener un usuario por ID
router.get('/usuarios/:id', usuarioController.obtenerUsuarioPorId);

// Ruta para actualizar un usuario por ID (incluye subida de imagen)
router.put('/usuarios/:id', upload.single('foto'), usuarioController.actualizarUsuario);

// Ruta para eliminar un usuario por ID
router.delete('/usuarios/:id', usuarioController.eliminarUsuario);

module.exports = router;
