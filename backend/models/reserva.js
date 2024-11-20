const db = require('../db/db');

class Reserva {
    constructor(id, monto, fecha_ingreso, fecha_salida, timestamp, estado, id_usuario, id_habitacion) {
        this.id = id;
        this.monto = monto;
        this.fecha_ingreso = fecha_ingreso;
        this.fecha_salida = fecha_salida;
        this.timestamp = timestamp || new Date();
        this.estado = estado || 1; // Estado activo por defecto
        this.id_usuario = id_usuario;
        this.id_habitacion = id_habitacion;
    }

    static async crearReserva(nuevaReserva) {
        const query = `
            INSERT INTO reservas (monto, fecha_ingreso, fecha_salida, timestamp, estado, id_usuario, id_habitacion)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const valores = [
            nuevaReserva.monto,
            nuevaReserva.fecha_ingreso,
            nuevaReserva.fecha_salida,
            nuevaReserva.timestamp || new Date(),
            nuevaReserva.estado || 1,
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

    static async obtenerReservas() {
        const query = `
            SELECT r.*, u.username AS usuario_nombre, h.capacidad AS habitacion_capacidad
            FROM reservas r
            JOIN usuarios u ON r.id_usuario = u.id
            JOIN habitaciones h ON r.id_habitacion = h.id
        `;
        try {
            const [rows] = await db.promise().execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener las reservas: ' + error.message);
        }
    }

    static async actualizarReserva(id, datos) {
        const query = `
            UPDATE reservas
            SET monto = ?, fecha_ingreso = ?, fecha_salida = ?, estado = ?, id_usuario = ?, id_habitacion = ?
            WHERE id = ?
        `;
        const valores = [
            datos.monto,
            datos.fecha_ingreso,
            datos.fecha_salida,
            datos.estado,
            datos.id_usuario,
            datos.id_habitacion,
            id,
        ];

        try {
            await db.promise().execute(query, valores);
            return { id, ...datos };
        } catch (error) {
            throw new Error('Error al actualizar la reserva: ' + error.message);
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
