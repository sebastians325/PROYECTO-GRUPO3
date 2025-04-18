const express = require('express')
const app = express()
const cors = require('cors')

const db = require('./models')
app.use(express.json())
app.use(cors())

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const freelancerProfileRoutes = require('./routes/freelancerProfile');
app.use('/freelancer-profile', freelancerProfileRoutes);

const clientProfileRoutes = require('./routes/clientProfile');
app.use('/client-profile', clientProfileRoutes);

//Rutas
const postRouter = require('./routes/usuarios')
app.use("/usuarios", postRouter);

db.sequelize.sync().then(() => {

    app.listen(3001, () => {
        console.log("Servidor corriendo en puerto 3001")
    })

})

const authRoutes = require('./routes/auth');
app.use("/auth", authRoutes);