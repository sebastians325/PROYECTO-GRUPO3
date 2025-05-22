import React, { useState } from 'react';
import './RegisterPage2.css'; 

const RegisterPageCliente = () => {
    // --- ESTADO (SIN especialidad, SIN role, SIN bio) ---
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const registerUser = async (userData) => {
        const { confirmPassword, ...dataToSend } = userData;

        try {
            // --- URL APUNTANDO A LA NUEVA RUTA DE CLIENTE ---
            const response = await fetch('http://localhost:3001/usuarios/register/cliente', { // <-- Nueva URL
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

            alert('Cliente registrado exitosamente!'); // Mensaje específico
            console.log('Registered client user:', responseData);
            setFormData({ // Limpiar formulario
                 nombre: '', apellido: '', correo: '', password: '', confirmPassword: ''
            });

        } catch (error) {
            console.error('Error registering client user:', error); // Mensaje específico
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

        // --- VALIDACIÓN (SIN especialidad, SIN role, SIN bio) ---
        if (!formData.nombre || !formData.apellido || !formData.correo || !formData.password) {
             alert('Faltan campos requeridos (nombre, apellido, correo, contraseña).'); // Mensaje específico
             return;
        }

        console.log('Form data to be sent:', formData);
        registerUser(formData);
    };

    // --- JSX (SIN especialidad, SIN role, SIN bio) ---
    return (
        <div>
            <h2>Registro de Cliente</h2> {/* Título específico */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
                </div>
                <div>
                    <label>Correo Electrónico:</label>
                    <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label>Confirmar Contraseña:</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                {/* Quitamos los campos de Rol, Especialidad y Bio */}
                <button type="submit">Registrarse como Cliente</button> {/* Texto botón específico */}
            </form>
        </div>
    );
};

export default RegisterPageCliente;