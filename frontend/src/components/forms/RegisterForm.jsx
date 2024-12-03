import React, { useState } from 'react';
import './generalForms.css'
function RegisterForm(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            username: username,
            correo: email,
            contraseña: password
        }
        try{
            const response = await fetch('http://localhost:8007/api/usuarios', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
                });
            if(response.ok){
                const data = await response.json();
                console.log(data);
                alert('Se ha creado el usuario');
            }else{
                console.error("Error al registrar el usuario")
                alert("Error al registrar el usuario")
            }
        }catch (error){
            console.error('Error al hacer el fetch', error);
            alert("Error en la conexión con el servidor")
        }
    }
return(
    <section>
            <h1>Registrate</h1>
            <form onSubmit={handleSubmit}>
                <h3>Nombre de Usuario</h3>
                <input type='text' placeholder='Digita tu Username' 
                value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <h3>Correo</h3>
                <input type='text' placeholder='Digita tu Correo' 
                value={email}  onChange={(e) => setEmail(e.target.value)} required/>
                <h3>Contraseña</h3>
                <input type='password'placeholder='Digita tu Contraseña'
                value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button type='submit'>Registrate</button>
            </form>
    </section>
)
}
export default RegisterForm;