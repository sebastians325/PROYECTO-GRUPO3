import React, { useState } from 'react';
import './RegisterPage.css';

const RegisterPage = () => {
    // --- ESTADO CORREGIDO ---
    const [formData, setFormData] = useState({
        nombre: '',        // Corregido
        apellido: '',      // Añadido
        correo: '',        // Corregido
        password: '',
        confirmPassword: '',
        
        especialidad: '',  // Corregido
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const registerUser = async (userData) => {
        const { confirmPassword, ...dataToSend } = userData;

        try {
            // --- URL CORREGIDA (PUERTO 3001) ---
            const response = await fetch('http://localhost:3001/usuarios/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const responseData = await response.json();

            if (!response.ok) {
                const errorMessage = responseData.error || `HTTP error! status: ${response.status}`;
                const errorDetails = responseData.details ? `\nDetalles: ${JSON.stringify(responseData.details)}` : '';
                alert(`Error: ${errorMessage}${errorDetails}`);
                console.error('Error data from server:', responseData);
                return;
            }

            alert('Usuario registrado exitosamente!');
            console.log('Registered user:', responseData);
            setFormData({ // Limpiar formulario
                 nombre: '', apellido: '', correo: '', password: '', confirmPassword: '',
                  especialidad: ''
            });

        } catch (error) {
            console.error('Error registering user:', error);
            if (error instanceof SyntaxError) {
                 alert('Ocurrió un error al procesar la respuesta del servidor.');
            } else {
                 alert('Ocurrió un error de red al intentar registrar el usuario.');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden!');
            return;
        }

        // --- VALIDACIÓN CORREGIDA ---
        // Ajusta si bio no es requerido
        if (!formData.nombre || !formData.apellido || !formData.correo || !formData.password || !formData.especialidad  ) {
             alert('Faltan campos requeridos (nombre, apellido, correo, contraseña, rol, bio).');
             return;
        }
        

        console.log('Form data to be sent:', formData);
        registerUser(formData);
    };

    // --- JSX CORREGIDO ---
    return (
        <div>
            <h2>Registro de Freelancer</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre" // Corregido
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input
                        type="text"
                        name="apellido" // Corregido
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Correo Electrónico:</label>
                    <input
                        type="email"
                        name="correo" // Corregido
                        value={formData.correo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Confirmar Contraseña:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Especialidad:</label>
                    <select
                        name="especialidad" // Corregido
                        value={formData.especialidad}
                        onChange={handleChange}
                        // required // Quitar si es opcional
                    >
                        <option value="">Seleccione especialidad (opcional)</option>
                        <option value="reparacion">Reparación</option>
                        <option value="diseno">Diseño</option>
                        <option value="desarrollo">Desarrollo Web</option>
                        {/* Agrega más opciones */}
                    </select>
                </div>
                 
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default RegisterPage;