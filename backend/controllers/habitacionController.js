const Habitacion = require('../models/habitacion');

exports.crearHabitacion = async (req, res) => {
    try {
        const nuevaHabitacion = req.body;
        const habitacion = await Habitacion.crearHabitacion(nuevaHabitacion);
        res.status(201).json(habitacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.obtenerHabitaciones = async (req, res) => {
    try {
        const habitaciones = await Habitacion.obtenerHabitaciones();
        res.status(200).json(habitaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.actualizarHabitacion = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const habitacion = await Habitacion.actualizarHabitacion(id, datosActualizados);
        res.status(200).json(habitacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.eliminarHabitacion = async (req, res) => {
    try {
        const { id } = req.params;
        await Habitacion.eliminarHabitacion(id);
        res.status(200).json({ message: 'Habitación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
