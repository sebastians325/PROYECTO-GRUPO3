// Archivo: servidor/controllers/chatbot.controller.js

const fetch = require('node-fetch');

const handleChat = async (req, res) => {
  try {
    const { contents, system_instruction } = req.body;

    const API_KEY = process.env.YOUR_SECURE_API_KEY; 
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

    if (!API_KEY) {
      console.error("API Key de IA no configurada en el servidor.");
      return res.status(500).json({ message: "Error de configuración del servidor." });
    }

    const requestBody = {
      contents,
      system_instruction,
      generationConfig: { temperature: 0.4 }
    };

    const apiResponse = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error("Error desde la API de Google:", errorData);
      return res.status(apiResponse.status).json({ message: "Error al comunicarse con la IA." });
    }

    const data = await apiResponse.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Error en el controlador de chat:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = { handleChat };