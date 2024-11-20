const db = require('../db/db');

class Categoria {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    static async obtenerCategorias() {
        const query = 'SELECT * FROM categorias';
        try {
            const [rows] = await db.promise().execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener las categorías: ' + error.message);
        }
    }

    static async crearCategoria(nombre) {
        const query = 'INSERT INTO categorias (nombre) VALUES (?)';
        try {
            const [result] = await db.promise().execute(query, [nombre]);
            return { id: result.insertId, nombre };
        } catch (error) {
            throw new Error('Error al crear la categoría: ' + error.message);
        }
    }

    static async actualizarCategoria(id, nombre) {
        const query = 'UPDATE categorias SET nombre = ? WHERE id = ?';
        try {
            await db.promise().execute(query, [nombre, id]);
            return { id, nombre };
        } catch (error) {
            throw new Error('Error al actualizar la categoría: ' + error.message);
        }
    }

    static async eliminarCategoria(id) {
        const query = 'DELETE FROM categorias WHERE id = ?';
        try {
            await db.promise().execute(query, [id]);
            return { message: 'Categoría eliminada correctamente' };
        } catch (error) {
            throw new Error('Error al eliminar la categoría: ' + error.message);
        }
    }
}

module.exports = Categoria;
