const Estado = require('../models/estado');

exports.obtenerEstados = async (req, res) => {
    try {
        const estados = await Estado.obtenerEstados();
        res.status(200).json(estados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los estados.', error: error.message });
    }
};
