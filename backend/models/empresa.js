const db = require('../db/db');

class Empresa {
    constructor(id, nombre, telefono, correo, descripcion, rol, estado) {
        this.id = id;
        this.nombre = nombre;
        this.telefono = telefono;
        this.correo = correo;
        this.descripcion = descripcion;
        this.rol = rol || 3; // Rol por defecto: empresa
        this.estado = estado || 1; // Estado por defecto: activo
    }

    static async crearEmpresa(nuevaEmpresa) {
        const query = `
            INSERT INTO empresa (nombre, telefono, correo, descripcion, rol, estado)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const valores = [
            nuevaEmpresa.nombre,
            nuevaEmpresa.telefono,
            nuevaEmpresa.correo,
            nuevaEmpresa.descripcion,
            nuevaEmpresa.rol || 3,
            nuevaEmpresa.estado || 1
        ];

        try {
            const [result] = await db.promise().execute(query, valores);
            return { id: result.insertId, ...nuevaEmpresa };
        } catch (error) {
            throw new Error('Error al crear la empresa: ' + error.message);
        }
    }

    static async obtenerEmpresas() {
        const query = 'SELECT * FROM empresa';
        try {
            const [rows] = await db.promise().execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener empresas: ' + error.message);
        }
    }

    static async actualizarEmpresa(id, datos) {
        const query = `
            UPDATE empresa
            SET nombre = ?, telefono = ?, correo = ?, descripcion = ?, estado = ?
            WHERE id = ?
        `;
        const valores = [
            datos.nombre,
            datos.telefono,
            datos.correo,
            datos.descripcion,
            datos.estado,
            id
        ];

        try {
            await db.promise().execute(query, valores);
            return { id, ...datos };
        } catch (error) {
            throw new Error('Error al actualizar la empresa: ' + error.message);
        }
    }

    static async eliminarEmpresa(id) {
        const query = 'DELETE FROM empresa WHERE id = ?';
        try {
            await db.promise().execute(query, [id]);
            return { message: 'Empresa eliminada correctamente' };
        } catch (error) {
            throw new Error('Error al eliminar la empresa: ' + error.message);
        }
    }
}

module.exports = Empresa;