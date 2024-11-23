const db = require('../db/db');

class Habitacion {
    constructor(id, nombre, descripcion, capacidad, foto, estado, timestamp, precio, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.capacidad = capacidad;
        this.foto = foto || null;
        this.estado = estado || 1; // Estado activo por defecto
        this.timestamp = timestamp || new Date();
        this.precio = precio;
        this.categoria = categoria; // ID de categoría
    }

    static async crearHabitacion(nuevaHabitacion) {
        const query = `
            INSERT INTO habitaciones (nombre, descripcion,capacidad, foto, estado, timestamp, precio, categoria)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const valores = [
            nuevaHabitacion.nombre,
            nuevaHabitacion.descripcion,
            nuevaHabitacion.capacidad,
            nuevaHabitacion.foto || null,
            nuevaHabitacion.estado || 1,
            nuevaHabitacion.timestamp || new Date(),
            nuevaHabitacion.precio,
            nuevaHabitacion.categoria,
        ];

        try {
            const [result] = await db.promise().execute(query, valores);
            return { id: result.insertId, ...nuevaHabitacion };
        } catch (error) {
            throw new Error('Error al crear la habitación: ' + error.message);
        }
    }

    static async obtenerHabitaciones() {
        const query = `
            SELECT h.*, c.nombre AS categoria_nombre 
            FROM habitaciones h
            JOIN categorias c ON h.categoria = c.id
        `;
        try {
            const [rows] = await db.promise().execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener las habitaciones: ' + error.message);
        }
    }

    static async actualizarHabitacion(id, datos) {
        const query = `
            UPDATE habitaciones
            SET nombre = ?, descripcion = ?, capacidad = ?, foto = ?, estado = ?, precio = ?, categoria = ?
            WHERE id = ?
        `;
        const valores = [
            datos. nombre,
            datos.descripcion,
            datos.capacidad,
            datos.foto || null,
            datos.estado,
            datos.precio,
            datos.categoria,
            id,
        ];

        try {
            await db.promise().execute(query, valores);
            return { id, ...datos };
        } catch (error) {
            throw new Error('Error al actualizar la habitación: ' + error.message);
        }
    }

    static async eliminarHabitacion(id) {
        const query = 'DELETE FROM habitaciones WHERE id = ?';
        try {
            await db.promise().execute(query, [id]);
            return { message: 'Habitación eliminada correctamente' };
        } catch (error) {
            throw new Error('Error al eliminar la habitación: ' + error.message);
        }
    }
}

module.exports = Habitacion;
