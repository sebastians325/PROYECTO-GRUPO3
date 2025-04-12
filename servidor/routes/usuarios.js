const express = require('express');
const router = express.Router();
const { usuarios } = require("../models");

// API GET
router.get("/", async (req, res) => {
    const listaUsuarios = await usuarios.findAll()
    res.json(listaUsuarios)
});

// API POST
router.post("/", async (req, res) => {
    const usuario = req.body;
    await usuarios.create(usuario)
    res.json(usuario)

})

module.exports = router;