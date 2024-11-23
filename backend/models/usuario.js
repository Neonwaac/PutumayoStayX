const db = require('../db/db');
const bcrypt = require('bcrypt');

class Usuario {
    constructor(id, username, contraseña, fecha, rol, estado, foto, token, timestamp) {
        this.id = id;
        this.username = username;
        this.contraseña = contraseña;
        this.fecha = fecha;
        this.rol = rol || 1;
        this.estado = estado || 1;
        this.foto = foto || null;
        this.token = token || null;
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
          const [rows] = await db.promise().execute(query, [username]);
          const usuario = rows[0];
          if (!usuario) {
            throw new Error('Usuario no encontrado.');
          }
          const contrasenaCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);
          if (contrasenaCorrecta) {
            delete usuario.contraseña;
            return usuario;
          } else {
            return null;
          }
        } catch (error) {
          throw new Error('Error al iniciar sesión: ' + error.message);
        }
      }   
    // Método para crear un nuevo usuario (simplificado)
    static async crearUsuario(nuevoUsuario) {
        const { username, contraseña, correo, foto } = nuevoUsuario;
        const hashContraseña = await this.encriptarContraseña(contraseña);
    
        // Foto predeterminada si no se proporciona
        const fotoPredeterminada = "./photos/users/default.png";
        const fotoUsuario = foto || fotoPredeterminada;
    
        const query = `
            INSERT INTO usuarios (username, contraseña, correo, foto)
            VALUES (?, ?, ?, ?)
        `;
        const valores = [
            username,
            hashContraseña,
            correo,
            fotoUsuario,
        ];
    
        try {
            const [result] = await db.promise().execute(query, valores);
            return { id: result.insertId, username, correo, foto: fotoUsuario };
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
        const query = `
            UPDATE usuarios 
            SET username = ?, fecha = ?, rol = ?, estado = ?, foto = ?, token = ? 
            WHERE id = ?
        `;
        const valores = [
            datosActualizados.username,
            datosActualizados.fecha,
            datosActualizados.rol,
            datosActualizados.estado,
            datosActualizados.foto,
            datosActualizados.token,
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