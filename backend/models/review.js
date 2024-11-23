const db = require("../db/db");

class Reseña {
  constructor(id, valor, descripcion, timestamp, id_usuario, nombre_usuario) {
    this.id = id;
    this.valor = valor;
    this.descripcion = descripcion;
    this.timestamp = timestamp || new Date();
    this.id_usuario = id_usuario;
    this.nombre_usuario = nombre_usuario;
  }

  // Método para crear una nueva reseña
  static async crearReseña(valor, descripcion, id_usuario) {
    // Consulta SQL simplificada
    const query = `INSERT INTO reseñas (valor, descripcion, id_usuario, timestamp) VALUES (?, ?, ?, ?)`;
    const timestamp = new Date(); // Crear el timestamp actual
  
    try {
      // Ejecutar la consulta con los valores proporcionados
      const [result] = await db.promise().execute(query, [valor, descripcion, id_usuario, timestamp]);
      // Retornar el objeto Reseña con los datos creados
      return new Reseña(result.insertId, valor, descripcion, timestamp, id_usuario);
    } catch (error) {
      throw new Error('Error al crear la reseña: ' + error.message);
    }
  }
  

  // Método para obtener todas las reseñas
  static async obtenerTodasLasReseñas() {
    const query = `
        SELECT r.*, u.username AS nombre_usuario 
        FROM reseñas r
        JOIN usuarios u ON r.id_usuario = u.id
    `;
    try {
      const [rows] = await db.promise().execute(query);
      return rows;
  } catch (error) {
      throw new Error('Error al obtener las habitaciones: ' + error.message);
  }
}


  // Método para obtener una reseña por ID
  static async obtenerReseñaPorId(id) {
    const query = `SELECT * FROM reseñas WHERE id = ?`;

    try {
      const [rows] = await db.promise().execute(query, [id]);
      const row = rows[0];
      return row ? new Reseña(row.id, row.valor, row.descripcion, row.timestamp, row.id_usuario) : null;
    } catch (error) {
      throw new Error('Error al obtener la reseña: ' + error.message);
    }
  }

  // Método para actualizar una reseña
  static async actualizarReseña(id, valor, descripcion) {
    const query = `UPDATE reseñas SET valor = ?, descripcion = ? WHERE id = ?`;

    try {
      await db.promise().execute(query, [valor, descripcion, id]);
      return await Reseña.obtenerPorId(id);
    } catch (error) {
      throw new Error('Error al actualizar la reseña: ' + error.message);
    }
  }

  // Método para eliminar una reseña
  static async eliminarReseña(id) {
    const query = `DELETE FROM reseñas WHERE id = ?`;

    try {
      await db.promise().execute(query, [id]);
      return { message: `Reseña con id ${id} eliminada correctamente` };
    } catch (error) {
      throw new Error('Error al eliminar la reseña: ' + error.message);
    }
  }
}

module.exports = Reseña;
