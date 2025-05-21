import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function DashboardCliente() {
  const navigate = useNavigate();
  const { id } = useParams(); // Id del cliente desde la URL
  const [user, setUser] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [postulantesPorPublicacion, setPostulantesPorPublicacion] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar usuario (simulado) y validar rol
  useEffect(() => {
    if (!id) {
      navigate('/login');
      return;
    }

    // Simular usuario cliente autenticado
    const usuarioSimulado = { id: parseInt(id), nombre: 'Cliente', role: 'cliente' };
    if (usuarioSimulado.role !== 'cliente') {
      navigate('/login');
      return;
    }
    setUser(usuarioSimulado);
  }, [id, navigate]);

  // Traer publicaciones propias del cliente
  useEffect(() => {
    if (!user) return;

    async function fetchPublicaciones() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3001/publicaciones?usuarioId=${user.id}`);
        if (!res.ok) throw new Error('Error al obtener publicaciones');
        const data = await res.json();
        setPublicaciones(data);

        // Por cada publicación traer sus postulantes
        const postulantesData = {};
        for (const pub of data) {
          const resPostulantes = await fetch(`http://localhost:3001/publicaciones/${pub.id}/candidatos`);
          if (!resPostulantes.ok) throw new Error('Error al obtener postulantes');
          const postulantes = await resPostulantes.json();
          postulantesData[pub.id] = postulantes;
        }
        setPostulantesPorPublicacion(postulantesData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPublicaciones();
  }, [user]);

  // Cambiar estado de publicación manualmente (select)
  const cambiarEstadoPublicacion = async (publicacionId, nuevoEstado) => {
    try {
      const res = await fetch(`http://localhost:3001/publicaciones/${publicacionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      if (!res.ok) throw new Error('Error al actualizar estado');

      setPublicaciones(prev =>
        prev.map(pub =>
          pub.id === publicacionId ? { ...pub, estado: nuevoEstado } : pub
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // Aceptar postulante
  const aceptarPostulante = async (postulacionId, publicacionId) => {
    try {
      const res = await fetch(`http://localhost:3001/postulaciones/${postulacionId}/aceptar`, {
        method: 'PUT',
      });
      if (!res.ok) throw new Error('Error al aceptar postulante');

      // Actualizar postulantes localmente
      const updatedPostulantes = postulantesPorPublicacion[publicacionId].map(p =>
        p.id === postulacionId ? { ...p, estado: 'aceptado' } : { ...p, estado: 'rechazado' }
      );
      setPostulantesPorPublicacion(prev => ({
        ...prev,
        [publicacionId]: updatedPostulantes,  // Using the correct variable name
      }));

      // Actualizar publicación localmente
      setPublicaciones(prev =>
        prev.map(pub =>
          pub.id === publicacionId ? { ...pub, estado: 'en_proceso' } : pub
        )
      );

      alert('Postulante aceptado correctamente.');
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="dashboard-cliente p-4">
      <h2 className="text-2xl font-bold mb-2">Bienvenido, {user?.nombre}</h2>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => navigate(`/publicaciones/crear/${user?.id}`)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Crear Publicación
        </button>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-2">Mis Publicaciones</h3>

      {loading ? (
        <p>Cargando publicaciones...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : publicaciones.length === 0 ? (
        <p>No has creado publicaciones todavía.</p>
      ) : (
        <div className="space-y-4">
          {publicaciones.map(pub => (
            <div key={pub.id} className="border p-4 rounded shadow">
              <h4 className="text-lg font-bold">{pub.titulo}</h4>
              <p>{pub.descripcion}</p>
              <p className="font-semibold">Pago: ${pub.pago}</p>
              <p>Estado: {pub.estado}</p>

              {/* Cambiar estado manual */}
              <div className="my-2">
                <label className="mr-2 font-semibold">Cambiar estado:</label>
                <select
                  value={pub.estado}
                  onChange={e => cambiarEstadoPublicacion(pub.id, e.target.value)}
                  className="border rounded px-2 py-1"
                  disabled={pub.estado !== 'abierto'} // desactivar si ya fue gestionada
                >
                  <option value="abierto">Abierto</option>
                  <option value="en_proceso">En proceso</option>
                  <option value="cerrado">Cerrado</option>
                </select>
              </div>

              {/* Postulantes */}
              <div className="mt-4">
                <h5 className="font-semibold mb-2">Postulantes:</h5>
                {postulantesPorPublicacion[pub.id]?.length === 0 ? (
                  <p>No hay postulantes aún.</p>
                ) : (
                  <ul className="space-y-2">
                    {postulantesPorPublicacion[pub.id]?.map(post => (
                      <li
                        key={post.id}
                        className="border p-2 rounded flex justify-between items-center"
                      >
                        <div>
                          {post.freelancer?.nombre} {post.freelancer?.apellido} - Estado: {post.estado}
                        </div>
                        {post.estado === 'pendiente' && pub.estado === 'abierto' && (
                          <button
                            onClick={() => aceptarPostulante(post.id, pub.id)}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                          >
                            Aceptar
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardCliente;
