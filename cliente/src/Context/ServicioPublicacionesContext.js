// services/ServicioPublicacionesContext.js
//D
import { createContext, useContext } from 'react';
import { PublicacionesService } from '../services/PublicacionesService';

const ServicioPublicacionesContext = createContext();

export const ServicioPublicacionesProvider = ({ children }) => {
  return (
    <ServicioPublicacionesContext.Provider value={PublicacionesService}>
      {children}
    </ServicioPublicacionesContext.Provider>
  );
};

export const useServicioPublicaciones = () => {
  const context = useContext(ServicioPublicacionesContext);
  if (!context) {
    throw new Error('useServicioPublicaciones debe usarse dentro de ServicioPublicacionesProvider');
  }
  return context;
};
