const express = require('express');
const db = require('./models'); 
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api', require('./routes/rutaEjemplo'));

const initializeDatabase = async () => {
  try {

    await db.sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');

    // Sincronizar modelos
    await db.sequelize.sync({
      force: false,   
      alter: process.env.NODE_ENV === 'development' 
    });
    
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  }
};

// Iniciar servidor
const startServer = async () => {
  await initializeDatabase();
  
  app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
  });
};

startServer();