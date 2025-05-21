import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ServicioPublicacionesProvider } from './Context/ServicioPublicacionesContext'; //Importa el Provider
import { MockPublicacionesService } from './services/MockPublicacionesService'; // usar mock


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    {/*<ServicioPublicacionesProvider>  D*/}
    <ServicioPublicacionesProvider servicio={MockPublicacionesService}>
      <App />
    </ServicioPublicacionesProvider>
  </BrowserRouter>
);

reportWebVitals();
