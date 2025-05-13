import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardCliente() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userStored = JSON.parse(localStorage.getItem('user'));
    if (!userStored || userStored.role !== 'cliente') {
      navigate('/login');
    } else {
      setUser(userStored);
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchPublicaciones();
    }

    async function fetchPublicaciones() {
      try {
        const response = await fetch('http://localhost:3001/publicaciones');
        if (!response.ok) throw new Error('Error al obtener publicaciones');
        const data = await response.json();

        // Filtrar solo las publicaciones del cliente logueado
        const publicacionesCliente = data.filter(pub => pub.usuarioId === user.id);
        setPublicaciones(publicacionesCliente);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }, [user]);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="dashboard-cliente p-4">
      <h2 className="text-2xl font-bold mb-2">Bienvenido, {user?.nombre}</h2>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => navigate('/publicaciones/crear')}
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
          {publicaciones.map((pub) => (
            <div key={pub.id} className="border p-4 rounded shadow">
              <h4 className="text-lg font-bold">{pub.titulo}</h4>
              <p>{pub.descripcion}</p>
              <p className="font-semibold">Pago: ${pub.pago}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardCliente;

