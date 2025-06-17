const express = require('express') 
const app = express()
const cors = require('cors')

const sequelize = require('./context/sequelize.context');
const db = require('./models');
app.use(express.json())
app.use(cors())

//Rutas
const usuariosRouter = require('./routes/usuarios.routes')
app.use("/usuarios", usuariosRouter);

const publicacionesRouter = require('./routes/publicaciones.routes');
app.use("/publicaciones", publicacionesRouter);

const postulacionesRouter = require('./routes/postulaciones.routes');
app.use("/postulaciones", postulacionesRouter);

const mensajesRouter = require('./routes/mensajes');
app.use("/mensajes", mensajesRouter);

const reviewRoutes = require('./routes/reviews.routes');
app.use('/reviews', reviewRoutes);

const historialRoutes = require('./routes/freelancer.routes');
app.use('/historial', historialRoutes);


db.sequelize.sync().then(() => {

    app.listen(3001, () => {
        console.log("Servidor corriendo en puerto 3001")
    })

})