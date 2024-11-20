const Empresa = require('../models/empresa');

exports.crearEmpresa = async (req, res) => {
    try {
        const nuevaEmpresa = req.body;
        const empresa = await Empresa.crearEmpresa(nuevaEmpresa);
        res.status(201).json(empresa);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.obtenerEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.obtenerEmpresas();
        res.status(200).json(empresas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.actualizarEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const empresa = await Empresa.actualizarEmpresa(id, datosActualizados);
        res.status(200).json(empresa);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.eliminarEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        await Empresa.eliminarEmpresa(id);
        res.status(200).json({ message: 'Empresa eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
