const Empresa = require('../models/empresa');

// Respuesta estándar para errores
const handleError = (res, error) => {
    res.status(500).json({ message: error.message });
};

// Crear una nueva empresa
exports.crearEmpresa = async (req, res) => {
    try {
        const nuevaEmpresa = req.body;
        const empresa = await Empresa.crearEmpresa(nuevaEmpresa);
        res.status(201).json(empresa);
    } catch (error) {
        handleError(res, error);
    }
};

// Obtener todas las empresas
exports.obtenerEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.obtenerEmpresas();
        res.status(200).json(empresas);
    } catch (error) {
        handleError(res, error);
    }
};

// Actualizar una empresa
exports.actualizarEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const empresa = await Empresa.actualizarEmpresa(id, datosActualizados);
        res.status(200).json(empresa);
    } catch (error) {
        handleError(res, error);
    }
};

// Eliminar una empresa
exports.eliminarEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        await Empresa.eliminarEmpresa(id);
        res.status(200).json({ message: 'Empresa eliminada correctamente' });
    } catch (error) {
        handleError(res, error);
    }
};
