const Categoria = require('../models/categoria');

exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.obtenerCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las categorías.', error: error.message });
    }
};

exports.crearCategoria = async (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({ message: 'El nombre de la categoría es requerido.' });
    }

    try {
        const categoria = await Categoria.crearCategoria(nombre);
        res.status(201).json(categoria);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la categoría.', error: error.message });
    }
};

exports.actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({ message: 'El nombre de la categoría es requerido.' });
    }

    try {
        const categoria = await Categoria.actualizarCategoria(id, nombre);
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la categoría.', error: error.message });
    }
};

exports.eliminarCategoria = async (req, res) => {
    const { id } = req.params;

    try {
        await Categoria.eliminarCategoria(id);
        res.status(200).json({ message: 'Categoría eliminada correctamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la categoría.', error: error.message });
    }
};
