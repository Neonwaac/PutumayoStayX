const Reserva = require('../models/reserva');

exports.crearReserva = async (req, res) => {
    try {
        const nuevaReserva = req.body;
        const reserva = await Reserva.crearReserva(nuevaReserva);
        res.status(201).json(reserva);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.obtenerReservas = async (req, res) => {
    const { id } = req.params
    try {
        const reservas = await Reserva.obtenerReservas(id);
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.actualizarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const reserva = await Reserva.actualizarReserva(id, datosActualizados);
        res.status(200).json(reserva);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.eliminarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        await Reserva.eliminarReserva(id);
        res.status(200).json({ message: 'Reserva eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
