const Categoria = require('../models/categoria');

const manejarError = (res, mensaje, error) => {
    res.status(500).json({ message: mensaje, error: error.message });
};

exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.obtenerCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        manejarError(res, 'Error al obtener las categorías.', error);
    }
};

exports.obtenerCategoriaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const categoria = await Categoria.obtenerCategoriaPorId(id);
        if (categoria) {
            res.status(200).json(categoria);
        } else {
            res.status(404).json({ message: 'Categoría no encontrada.' });
        }
    } catch (error) {
        manejarError(res, 'Error al obtener la categoría por ID.', error);
    }
};
