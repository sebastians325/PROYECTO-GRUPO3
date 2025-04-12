const express = require('express')
const app = express()
const cors = require('cors')

const db = require('./models')
app.use(express.json())
app.use(cors())

//Rutas
const postRouter = require('./routes/usuarios')
app.use("/usuarios", postRouter);

db.sequelize.sync().then(() => {

    app.listen(3001, () => {
        console.log("Servidor corriendo en puerto 3001")
    })

})