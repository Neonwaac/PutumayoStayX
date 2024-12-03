const db = require('../db/db');

class Reserva {
    constructor(id, monto, fecha_ingreso, fecha_salida, estado, id_usuario, id_habitacion) {
        this.id = id;
        this.monto = monto;
        this.fecha_ingreso = fecha_ingreso;
        this.fecha_salida = fecha_salida;
        this.estado = estado
        this.id_usuario = id_usuario;
        this.id_habitacion = id_habitacion;
    }

    static async crearReserva(nuevaReserva) {
        const query = `
            INSERT INTO reservas (monto, fecha_ingreso, fecha_salida, estado, id_usuario, id_habitacion)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const valores = [
            nuevaReserva.monto,
            nuevaReserva.fecha_ingreso,
            nuevaReserva.fecha_salida,
            nuevaReserva.estado,
            nuevaReserva.id_usuario,
            nuevaReserva.id_habitacion,
        ];

        try {
            const [result] = await db.promise().execute(query, valores);
            return { id: result.insertId, ...nuevaReserva };
        } catch (error) {
            throw new Error('Error al crear la reserva: ' + error.message);
        }
    }

    static async obtenerReservas(id_usuario) {
        const query = `
            SELECT r.*, h.nombre AS habitacion_nombre
            FROM reservas r
            JOIN habitaciones h ON r.id_habitacion = h.id WHERE id_usuario = ?
        `;
        try {
            const [rows] = await db.promise().execute(query, [id_usuario]);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener las reservas: ' + error.message);
        }
    }

    static async eliminarReserva(id) {
        const query = 'DELETE FROM reservas WHERE id = ?';
        try {
            await db.promise().execute(query, [id]);
            return { message: 'Reserva eliminada correctamente' };
        } catch (error) {
            throw new Error('Error al eliminar la reserva: ' + error.message);
        }
    }
}

module.exports = Reserva;
