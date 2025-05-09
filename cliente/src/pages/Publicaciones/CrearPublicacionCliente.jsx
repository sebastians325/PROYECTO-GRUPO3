import React, { useState } from 'react'; 
import Pie from '../../ComponentesGeneral/footer';

const CrearPublicacionCliente = () => {
    // --- ESTADO (SIN especialidad, SIN role, SIN bio) ---
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        salario: '',
        ubicacion: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const createPublication = async (publicationData) => {
        try {
            // --- URL APUNTANDO A LA NUEVA RUTA DE CREACIÓN DE PUBLICACIÓN ---
            const response = await fetch('http://localhost:3001/publicaciones/crear', { // <-- Nueva URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(publicationData),
            });

            const responseData = await response.json();

            if (!response.ok) {
                const errorMessage = responseData.error || `HTTP error! status: ${response.status}`;
                const errorDetails = responseData.details ? `\nDetalles: ${JSON.stringify(responseData.details)}` : '';
                alert(`Error: ${errorMessage}${errorDetails}`);
                console.error('Error data from server:', responseData);
                return;
            }

            alert('Publicación creada exitosamente!'); // Mensaje específico
            console.log('Created publication:', responseData);
            setFormData({ // Limpiar formulario
                nombre: '', descripcion: '', salario: '', ubicacion: ''
            });

        } catch (error) {
            console.error('Error creating publication:', error); // Mensaje específico
            if (error instanceof SyntaxError) {
                 alert('Ocurrió un error al procesar la respuesta del servidor.');
            } else {
                 alert('Ocurrió un error de red al intentar crear la publicación.');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // --- VALIDACIÓN (Faltan campos requeridos) ---
        if (!formData.nombre || !formData.descripcion || !formData.salario || !formData.ubicacion) {
             alert('Faltan campos requeridos (nombre, descripción, salario, ubicación).'); // Mensaje específico
             return;
        }

        console.log('Form data to be sent:', formData);
        createPublication(formData);
    };

    // --- JSX (Formulario para crear publicación) ---
    return (
        <div>
            <h2>Crear Publicación</h2> {/* Título específico */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de la Publicación:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required />
                </div>
                <div>
                    <label>Salario:</label>
                    <input type="number" name="salario" value={formData.salario} onChange={handleChange} required />
                </div>
                <div>
                    <label>Ubicación:</label>
                    <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required />
                </div>
                <button type="submit">Crear Publicación</button> {/* Texto botón específico */}
            </form>
            <Pie />
        </div>
    );
};

export default CrearPublicacionCliente;
