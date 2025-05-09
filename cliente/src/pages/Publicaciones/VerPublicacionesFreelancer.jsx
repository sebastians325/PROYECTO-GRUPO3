import React, { useEffect, useState } from 'react';
import Pie from '../../ComponentesGeneral/footer';

const VerPublicacionesFreelancer = () => {
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
        const fetchPublicaciones = async () => {
            try {
                const response = await fetch('http://localhost:3001/publicaciones');
                const data = await response.json();
                
                if (response.ok) {
                    setPublicaciones(data);
                } else {
                    alert('No se pudieron cargar las publicaciones.');
                }
            } catch (error) {
                alert('Error al obtener publicaciones.');
                console.error(error);
            }
        };

        fetchPublicaciones();
    }, []);

    return (
        <div>
            <h2>Publicaciones Disponibles</h2>
            {publicaciones.length === 0 ? (
                <p>No hay publicaciones disponibles en este momento.</p>
            ) : (
                <ul>
                    {publicaciones.map(pub => (
                        <li key={pub.id}>
                            <strong>{pub.titulo}</strong> <br />
                            {pub.descripcion} <br />
                            <strong>Cliente:</strong> {pub.cliente?.nombre} {pub.cliente?.apellido} <br />
                            <strong>Ubicación:</strong> {pub.ubicacion} <br />
                            <strong>Salario:</strong> ${pub.salario}
                        </li>
                    ))}
                </ul>
            )}
            <Pie />
        </div>
    );
};

export default VerPublicacionesFreelancer;