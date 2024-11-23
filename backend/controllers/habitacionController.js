const Habitacion = require('../models/habitacion');

exports.crearHabitacion = async (req, res) => {
    try {
        const nuevaHabitacion = {
            ...req.body,
            foto: req.file ? `photos/habitacion/${req.file.filename}` : null,
        };

        const habitacion = await Habitacion.crearHabitacion(nuevaHabitacion);
        res.status(201).json(habitacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.obtenerHabitaciones = async (req, res) => {
    try {
        const habitaciones = await Habitacion.obtenerHabitaciones();
        habitaciones.forEach(habitacion => {
            if (habitacion.foto) {
                habitacion.foto = `${req.protocol}://${req.get('host')}/${habitacion.foto}`;
            }
        });
        res.status(200).json(habitaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.actualizarHabitacion = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = {
            ...req.body,
            foto: req.file ? `photos/habitacion/${req.file.filename}` : req.body.foto // Usa la nueva imagen o conserva la anterior
        };

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
