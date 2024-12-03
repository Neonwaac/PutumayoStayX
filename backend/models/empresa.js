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

    // Crear una nueva empresa
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

        return this.ejecutarQuery(query, valores, 'crear la empresa');
    }

    // Obtener todas las empresas
    static async obtenerEmpresas() {
        const query = 'SELECT * FROM empresa';
        return this.ejecutarQuery(query, [], 'obtener empresas');
    }

    // Actualizar una empresa
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

        return this.ejecutarQuery(query, valores, 'actualizar la empresa');
    }

    // Eliminar una empresa
    static async eliminarEmpresa(id) {
        const query = 'DELETE FROM empresa WHERE id = ?';
        return this.ejecutarQuery(query, [id], 'eliminar la empresa');
    }

    // Método genérico para ejecutar queries
    static async ejecutarQuery(query, valores, accion) {
        try {
            const [result] = await db.promise().execute(query, valores);
            return result;
        } catch (error) {
            throw new Error(`Error al ${accion}: ${error.message}`);
        }
    }
}

module.exports = Empresa;
