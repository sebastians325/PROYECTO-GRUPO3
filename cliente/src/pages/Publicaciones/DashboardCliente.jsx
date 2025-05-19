//Publicaciones/DashboardCliente.jsx

import { useNavigate, useParams } from 'react-router-dom';
import { usePublicacionesCliente } from '../components/usePublicacionesCliente';
import PostulanteCard from '../components/PostulanteCard';
import { aceptarPostulanteAPI } from '../services/postulacionService';
import PublicacionService from '../services/publicacionService';
//import { cambiarEstadoPublicacionAPI } from '../services/publicacionService';


function DashboardCliente() {
  const navigate = useNavigate();
  const { id } = useParams();
  const usuarioSimulado = { id: parseInt(id), nombre: 'Cliente', role: 'cliente' };

  // Hooks siempre al inicio
  const {
    publicaciones,
    setPublicaciones,
    postulantesPorPublicacion,
    setPostulantesPorPublicacion,
    loading,
    error
  } = usePublicacionesCliente(usuarioSimulado.id);

  // Validación dentro del efecto, no antes del hook
  if (!id || usuarioSimulado.role !== 'cliente') {
    navigate('/login');
    return null;
  }

  const cambiarEstado = async (publicacionId, nuevoEstado) => {
    try {
      
      await PublicacionService.cambiarEstadoPublicacionAPI(publicacionId, nuevoEstado);
      setPublicaciones(prev =>
        prev.map(pub =>
          pub.id === publicacionId ? { ...pub, estado: nuevoEstado } : pub
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const aceptarPostulante = async (postulacionId, publicacionId) => {
    try {
      await aceptarPostulanteAPI(postulacionId);
      const actualizados = postulantesPorPublicacion[publicacionId].map(p =>
        p.id === postulacionId
          ? { ...p, estado: 'aceptado' }
          : { ...p, estado: 'rechazado' }
      );
      setPostulantesPorPublicacion(prev => ({
        ...prev,
        [publicacionId]: actualizados,
      }));

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
      <h2 className="text-2xl font-bold mb-2">Bienvenido, {usuarioSimulado.nombre}</h2>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => navigate(`/publicaciones/crear/${usuarioSimulado.id}`)}
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
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        publicaciones.map(pub => (
          <div key={pub.id} className="border p-4 rounded shadow">
            <h4 className="text-lg font-bold">{pub.titulo}</h4>
            <p>{pub.descripcion}</p>
            <p>Pago: ${pub.pago}</p>
            <p>Estado: {pub.estado}</p>

            <div className="my-2">
              <label className="mr-2 font-semibold">Cambiar estado:</label>
              <select
                value={pub.estado}
                onChange={e => cambiarEstado(pub.id, e.target.value)}
                disabled={pub.estado !== 'abierto'}
                className="border px-2 py-1"
              >
                <option value="abierto">Abierto</option>
                <option value="en_proceso">En proceso</option>
                <option value="cerrado">Cerrado</option>
              </select>
            </div>

            <div className="mt-4">
              <h5 className="font-semibold">Postulantes:</h5>
              {postulantesPorPublicacion[pub.id]?.length === 0 ? (
                <p>No hay postulantes.</p>
              ) : (
                postulantesPorPublicacion[pub.id].map(post => (
                  <PostulanteCard
                    key={post.id}
                    postulante={post}
                    puedeAceptar={post.estado === 'pendiente' && pub.estado === 'abierto'}
                    onAceptar={() => aceptarPostulante(post.id, pub.id)}
                  />
                ))
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default DashboardCliente;
