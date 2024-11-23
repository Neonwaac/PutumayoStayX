const Reseña = require('../models/review');

// Crear una nueva reseña
exports.crearReseña = async (req, res) => {
  const { valor, descripcion, id_usuario} = req.body;

  if (!valor || !descripcion) {
    return res.status(400).json({ message: "Faltan campos requeridos." });
  }

  try {
    const nuevaReseña = await Reseña.crearReseña(valor, descripcion, id_usuario);
    res.status(201).json(nuevaReseña);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la reseña.", error: error.message });
  }
};


// Obtener todas las reseñas
exports.obtenerTodasReseñas = async (req, res) => {
  try {
    const reseñas = await Reseña.obtenerTodasLasReseñas();
    res.status(200).json(reseñas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las reseñas.', error: error.message });
  }
};

// Obtener una reseña por ID
exports.obtenerReseñaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const reseña = await Reseña.obtenerReseñaPorId(id);

    if (reseña) {
      res.status(200).json(reseña);
    } else {
      res.status(404).json({ message: 'Reseña no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la reseña.', error: error.message });
  }
};

// Actualizar una reseña
exports.actualizarReseña = async (req, res) => {
  const { id } = req.params;
  const { valor, descripcion } = req.body;

  if (!valor || !descripcion) {
    return res.status(400).json({ message: 'Faltan campos requeridos.' });
  }

  try {
    const reseñaActualizada = await Reseña.actualizarReseña(id, valor, descripcion);

    if (reseñaActualizada) {
      res.status(200).json(reseñaActualizada);
    } else {
      res.status(404).json({ message: 'Reseña no encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la reseña.', error: error.message });
  }
};

// Eliminar una reseña
exports.eliminarReseña = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await Reseña.eliminarReseña(id);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la reseña.', error: error.message });
  }
};
