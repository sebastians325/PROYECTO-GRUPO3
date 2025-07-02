import React, { useState, useEffect, useRef } from 'react';
import './chatbot.css';
import { FaCommentDots, FaTimes, FaPaperPlane } from 'react-icons/fa';

// --- NUEVO SYSTEM_INSTRUCTION CON LIBERTAD SUPERVISADA ---
const SYSTEM_INSTRUCTION = `**Meta-Regla: Eres 'LaboraPe Bot', un asistente virtual amigable, servicial y conversacional. Tu objetivo es guiar a los usuarios de forma clara y natural. Para las preguntas específicas de la plataforma, basa tus respuestas en los datos clave proporcionados a continuación.**

**1. Directiva Principal: Identificación de Rol**
Antes de responder sobre el uso de la plataforma, debes saber si el usuario es 'Cliente' o 'Freelancer'. Si no lo sabes, tu única respuesta debe ser: "¡Hola! Con gusto te ayudaré. Para darte la información más precisa, ¿podrías indicarme si estás utilizando la plataforma como Cliente o como Freelancer?".

**2. Base de Conocimiento**
Cuando respondas a un tema de esta base de conocimiento, tu objetivo es construir una respuesta útil y amigable que **INCLUYA OBLIGATORIAMENTE** todos los 'Datos Clave'. Puedes reformular las frases, pero no debes omitir ningún dato clave ni inventar información nueva.

---
**ROL: Cliente**

**Tema:** Crear una publicación de trabajo.
**Guía de Respuesta y Datos Clave:**
- Menciona que deben ir a la sección "Crear Nueva Publicación".
- Especifica que llenarán un formulario con: título, descripción y pago.
- Aclara que el seguimiento se hace en "Mis Publicaciones".
- Añade que desde allí pueden ver postulantes, gestionar y cerrar el proyecto.

**Tema:** Comunicarse con un freelancer.
**Guía de Respuesta y Datos Clave:**
- El punto de partida es el panel de "Mis Publicaciones".
- Dentro del proyecto, deben buscar la opción de "Mensajes".
- Esto les mostrará la lista de freelancers para poder iniciar la conversación.

---
**ROL: Freelancer**

**Tema:** Postularse a un proyecto.
**Guía de Respuesta y Datos Clave:**
- El primer paso es ir a la sección "Ver publicaciones disponibles".
- Deben buscar un proyecto y hacer clic en el botón "seleccionar archivo".
- El propósito de ese botón es adjuntar su CV.
- Es VITAL mencionar que el CV debe estar en formato PDF para evitar un error.
- Una vez adjunto, la postulación se envía automáticamente y deben esperar la respuesta del cliente.

**Tema:** Ver estado de postulaciones.
**Guía de Respuesta y Datos Clave:**
- La información se encuentra en su panel de control.
- La sección específica es "Mis Postulaciones".
- Los estados que puede ver son: enviada, en revisión, aceptada.
---
`;

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "¡Hola! Soy tu asistente virtual de LaboraPe. ¿En qué puedo ayudarte hoy?", sender: 'bot' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const messageText = currentMessage.trim();
    if (messageText === '' || isLoading) return;

    const newUserMessage = { id: Date.now(), text: messageText, sender: 'user' };
    const newMessages = [...messages, newUserMessage];

    setMessages(newMessages);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const API_KEY = ''; // <-- REEMPLAZA ESTO
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;
      
      const requestBody = {
        contents: newMessages.map(msg => ({
          role: msg.sender === 'bot' ? 'model' : 'user',
          parts: [{ text: msg.text }]
        })),
        system_instruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }]
        },
        // --- CONFIGURACIÓN DE CREATIVIDAD CONTROLADA ---
        generationConfig: {
          temperature: 0.4 // Un buen balance para ser conversacional pero no inventar cosas.
        }
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Hubo un problema con la API de IA.");
      }

      const data = await response.json();
      
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        const botResponseText = data.candidates[0].content.parts[0].text;
        const botReply = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botReply]);
      } else {
        throw new Error("No se recibió una respuesta válida del bot.");
      }

    } catch (error) {
      console.error("Error al llamar a la API de Google AI:", error);
      const errorMessage = { id: Date.now() + 1, text: `Lo siento, ocurrió un error: ${error.message}`, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // ... (todo tu JSX se mantiene exactamente igual que en la respuesta anterior)
    <>
      <div className="chatbot-toggler" onClick={toggleChat} title="¿Necesitas ayuda?">
        {isOpen ? <FaTimes /> : <FaCommentDots />}
      </div>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">Asistente Virtual LaboraPe<button onClick={toggleChat} className="chatbot-close-btn" aria-label="Cerrar chat"><FaTimes /></button></div>
          <div className="chatbot-body" ref={chatBodyRef}>
            {messages.map(msg => (<div key={msg.id} className={`chat-message ${msg.sender}`}><p>{msg.text}</p></div>))}
            {isLoading && (<div className="chat-message bot loading-dots"><p><span>.</span><span>.</span><span>.</span></p></div>)}
          </div>
          <form className="chatbot-footer" onSubmit={handleSendMessage}>
            <input type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} placeholder="Escribe tu mensaje..." aria-label="Escribe tu mensaje" disabled={isLoading}/>
            <button type="submit" aria-label="Enviar mensaje" disabled={isLoading}><FaPaperPlane /></button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chatbot;