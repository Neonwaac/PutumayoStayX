const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Usuario {
    constructor(id, username, contraseña, fecha, rol, token, timestamp) {
        this.id = id;
        this.username = username;
        this.contraseña = contraseña;
        this.fecha = fecha;
        this.rol = rol;
        this.token = token;
        this.timestamp = timestamp;
    }

    // Método para encriptar la contraseña antes de guardar
    static async encriptarContraseña(contraseña) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(contraseña, salt);
    }

    // Método para comparar contraseñas en el login
    static async iniciarSesion(username, contraseña) {
        const query = 'SELECT * FROM usuarios WHERE username = ?';
    
        try {
          // Buscar usuario en la base de datos
          const [rows] = await db.promise().execute(query, [username]);
    
          if (rows.length === 0) {
            const error = new Error('Usuario no encontrado.');
            error.statusCode = 404;
            throw error;
          }
    
          const usuario = rows[0];
    
          // Validar la contraseña
          const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
          if (!esValida) {
            const error = new Error('Contraseña incorrecta.');
            error.statusCode = 401;
            throw error;
          }
    
          // Generar token JWT
          const token = jwt.sign(
            { id: usuario.id, username: usuario.username, role: usuario.rol },
            process.env.JWT_SECRET || 'clave_secreta',
            { expiresIn: '1h' }
          );
    
          // Retornar usuario y token, omitiendo la contraseña
          delete usuario.contraseña;
    
          return { usuario, token };
        } catch (error) {
          if (!error.statusCode) {
            error.statusCode = 500; // Error interno del servidor si no se especifica otro
          }
          throw error;
        }
      }
      
    // Método para crear un nuevo usuario (simplificado)
    static async crearUsuario(nuevoUsuario) {
        const { username, contraseña, correo, foto } = nuevoUsuario;
        const hashContraseña = await this.encriptarContraseña(contraseña);
        const query = `
            INSERT INTO usuarios (username, contraseña, correo)
            VALUES (?, ?, ?)
        `;
        const valores = [
            username,
            hashContraseña,
            correo,
        ];
    
        try {
            const [result] = await db.promise().execute(query, valores);
            return { id: result.insertId, username, correo};
        } catch (error) {
            throw new Error('Error al crear el usuario: ' + error.message);
        }
    }
    
    static async obtenerUsuarios(){
        const query = 'SELECT * FROM usuarios'
        try {
            const [result] = await db.promise().execute(query);
            return result;
        }catch (error){
            throw new Error('Error al obtener el usuario: ' + error.message);
        }
    }
    // Método para obtener un usuario por ID
    static async obtenerUsuarioPorId(id) {
        const query = 'SELECT * FROM usuarios WHERE id = ?';
        try {
            const [rows] = await db.promise().execute(query, [id]);
            return rows[0];
        } catch (error) {
            throw new Error('Error al obtener el usuario: ' + error.message);
        }
    }

    // Método para actualizar un usuario
    static async actualizarUsuario(id, datosActualizados) {
        const hashContraseña = await this.encriptarContraseña(datosActualizados.contraseña);
        const query = `
            UPDATE usuarios 
            SET username = ?, correo = ?, contraseña = ? WHERE id = ?
        `;
        const valores = [
            datosActualizados.username,
            datosActualizados.correo,
            hashContraseña,
            id,
        ];
    
        try {
            await db.promise().execute(query, valores);
            return { id, ...datosActualizados };
        } catch (error) {
            throw new Error('Error al actualizar el usuario: ' + error.message);
        }
    }
    // Método para eliminar un usuario
    static async eliminarUsuario(id) {
        const query = 'DELETE FROM usuarios WHERE id = ?';
        try {
            await db.promise().execute(query, [id]);
            return { message: 'Usuario eliminado correctamente' };
        } catch (error) {
            throw new Error('Error al eliminar el usuario: ' + error.message);
        }
    }
}

module.exports = Usuario;