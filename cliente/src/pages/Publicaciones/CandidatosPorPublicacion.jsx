import React, { useState } from 'react';
import Pie from '../../ComponentesGeneral/footer';

const CandidatosPorPublicacion = () => {
    const [publicacionId, setPublicacionId] = useState('');
    const [candidatos, setCandidatos] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCandidatos = async () => {
        if (!publicacionId) {
            alert('Por favor, ingresa un ID de publicación.');
            return;
        }

        setLoading(true); // Indicar que la búsqueda está en proceso

        try {
            const response = await fetch(`http://localhost:3001/publicaciones/${publicacionId}/candidatos`);
            const data = await response.json();

            if (response.ok) {
                setCandidatos(data);
            } else {
                alert('No se encontraron candidatos para esta publicación.');
                setCandidatos([]); // Limpiar lista de candidatos si no se encuentran
            }
        } catch (error) {
            alert('Error al obtener candidatos.');
            console.error(error);
            setCandidatos([]); // Limpiar lista de candidatos en caso de error
        }

        setLoading(false); // Terminar el estado de carga
    };

    return (
        <div>
            <h2>Ver Candidatos</h2>
            <div>
                <label>ID de Publicación:</label>
                <input
                    type="text"
                    value={publicacionId}
                    onChange={(e) => setPublicacionId(e.target.value)}
                />
                <button onClick={fetchCandidatos} disabled={loading}>
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </div>
            {candidatos.length > 0 ? (
                <ul>
                    {candidatos.map(c => (
                        <li key={c.id}>
                            {c.freelancer?.nombre} {c.freelancer?.apellido} - {c.freelancer?.especialidad} ({c.estado})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No se han encontrado candidatos para esta publicación.</p>
            )}
            <Pie />
        </div>
    );
};

export default CandidatosPorPublicacion;
