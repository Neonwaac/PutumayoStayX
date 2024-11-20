const db = require('../db/db');

class Rol {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    static async obtenerRoles() {
        const query = 'SELECT * FROM roles';
        try {
            const [rows] = await db.promise().execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener los roles: ' + error.message);
        }
    }
}

module.exports = Rol;
