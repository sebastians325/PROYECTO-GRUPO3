//Publicaciones/DashboardFreelancer.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Pie from '../../ComponentesGeneral/footer';

const DashboardFreelancer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (!storedUser || storedUser.role !== 'freelancer') {
      navigate('/publicaciones/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="dashboard-freelancer">
      <h2>Bienvenido, {user?.nombre}</h2>
      <p>Tu ID: {id}</p>
      <p>Este es tu panel de freelancer.</p>
      <button onClick={() => navigate(`/publicaciones/ver/${user?.id}`)}>
        Ver Publicaciones Disponibles
      </button>
      <button onClick={logout}>Cerrar sesión</button>
      <Pie />
    </div>
  );
};

export default DashboardFreelancer;