import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // <-- asegúrate de importar useParams si quieres usar ":id"

function DashboardCliente() {
  const navigate = useNavigate();
  const { id } = useParams(); // <-- para leer el id de la URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStored = JSON.parse(localStorage.getItem('user'));
    if (!userStored || userStored.role !== 'cliente') {
      navigate('/login');
    } else {
      setUser(userStored);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="dashboard-cliente">
      <h2>Bienvenido, {user?.nombre}</h2>
      <p>Tu ID: {id}</p> {/* para mostrar el id si quieres */}
      <button onClick={() => navigate('/publicaciones/crear')}>Crear Publicación</button>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}

export default DashboardCliente;
