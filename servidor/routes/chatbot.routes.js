// Archivo: servidor/routes/chatbot.routes.js

const { Router } = require('express');
const { handleChat } = require('../controllers/chatbot.controller.js');

const router = Router();

router.post('/', handleChat);

module.exports = router;