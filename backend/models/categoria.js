const db = require('../db/db');

class Categoria {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    static manejarError(mensaje, error) {
        throw new Error(`${mensaje}: ${error.message}`);
    }

    static async obtenerCategorias() {
        const query = 'SELECT * FROM categorias';
        try {
            const [rows] = await db.promise().execute(query);
            return rows;
        } catch (error) {
            this.manejarError('Error al obtener las categorías', error);
        }
    }

    static async obtenerCategoriaPorId(id) {
        const query = 'SELECT * FROM categorias WHERE id = ?';
        try {
            const [rows] = await db.promise().execute(query, [id]);
            return rows[0]; // Retorna solo la primera coincidencia
        } catch (error) {
            this.manejarError('Error al obtener la categoría por ID', error);
        }
    }
}

module.exports = Categoria;
