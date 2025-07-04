// Archivo: servidor/services/chatbotService.js

const fetch = require('node-fetch');

class ChatbotService {
  constructor() {
    this.apiKey = process.env.YOUR_SECURE_API_KEY;
    this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.apiKey}`;
  }
  async queryAI(payload) {
    if (!this.apiKey) {
      console.error("API Key de IA no configurada en el servidor.");
      throw new Error("Error de configuración del servidor.");
    }

    const { contents, system_instruction } = payload;

    const requestBody = {
      contents,
      system_instruction,
      generationConfig: {
        temperature: 0.4
      }
    };

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.error("Error desde la API de Google:", await response.text());
      throw new Error("Error al comunicarse con la IA.");
    }

    return response.json();
  }
}

module.exports = ChatbotService;