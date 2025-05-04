const express = require('express')
const app = express()
const cors = require('cors')

const db = require('./models')
app.use(express.json())
app.use(cors())

//Rutas
const usuariosRouter = require('./routes/usuarios')
app.use("/usuarios", usuariosRouter);

const publicacionesRouter = require('./routes/publicaciones');
app.use("/publicaciones", publicacionesRouter);

const postulacionesRouter = require('./routes/postulaciones');
app.use("/postulaciones", postulacionesRouter);


db.sequelize.sync().then(() => {

    app.listen(3001, () => {
        console.log("Servidor corriendo en puerto 3001")
    })

})