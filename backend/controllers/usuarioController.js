const Usuario = require('../models/usuario');
const path = require('path');

exports.iniciarSesion = async (req, res) => {
  const { username, contraseña } = req.body;

  if (!username || !contraseña) {
    return res.status(400).json({ message: 'Faltan campos requeridos.' });
  }

  try {
    const { usuario, token } = await Usuario.iniciarSesion(username, contraseña);
    return res.status(200).json({
      message: 'Inicio de sesión exitoso.',
      token,
      usuario,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ message: error.message });
  }
};

// Controlador para crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
    const { username, contraseña, correo, foto } = req.body;

    if (!username || !contraseña || !correo) {
        return res.status(400).json({ message: 'Faltan campos requeridos.' });
    }

    // Foto predeterminada si no se proporciona
    const fotoPredeterminada = "./photos/users/default.png";
    const fotoUsuario = foto || fotoPredeterminada;

    try {
        const nuevoUsuario = { username, contraseña, correo, foto: fotoUsuario };
        const usuarioCreado = await Usuario.crearUsuario(nuevoUsuario);
        res.status(201).json(usuarioCreado);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario.', error: error.message });
    }
};


exports.obtenerUsuarios = async (req, res) =>{
    try{
        const usuarios = await Usuario.obtenerUsuarios()
        if(usuarios){
            res.status(200).json(usuarios)
        }else{
            res.status(500).json({message: 'No hay usuarios en la base de datos.'})
        }
    }catch{
        res.status(500).json({message: 'Error al obtener los usuarios.'})
    }
}

// Controlador para obtener un usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.obtenerUsuarioPorId(id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario.', error: error.message });
    }
};

// Controlador para actualizar un usuario
exports.actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;

    try {
        const usuarioActualizado = await Usuario.actualizarUsuario(id, datosActualizados);
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario.', error: error.message });
    }
};

// Controlador para eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        await Usuario.eliminarUsuario(id);
        res.status(200).json({ message: 'Usuario eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario.', error: error.message });
    }
};
