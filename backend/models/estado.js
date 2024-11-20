const db = require('../db/db');

class Estado {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    static async obtenerEstados() {
        const query = 'SELECT * FROM estado';
        try {
            const [rows] = await db.promise().execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener los estados: ' + error.message);
        }
    }
}

module.exports = Estado;

