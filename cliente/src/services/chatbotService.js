// cliente/src/services/chatbotService.js

const API_BASE_URL = 'http://localhost:3001'; 

export const sendChatQuery = async (payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chatbot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la petición al servidor');
    }

    return await response.json();
  } catch (error) {
    console.error("Error en el servicio de chatbot:", error);
    throw error; 
  }
};