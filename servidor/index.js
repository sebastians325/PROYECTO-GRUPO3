const express = require('express')
const app = express()

const db = require('./models')
app.use(express.json())

//Rutas
const postRouter = require('./routes/usuarios')
app.use("/usuarios", postRouter);

db.sequelize.sync().then(() => {

    app.listen(3001, () => {
        console.log("Servidor corriendo en puerto 3001")
    })

})