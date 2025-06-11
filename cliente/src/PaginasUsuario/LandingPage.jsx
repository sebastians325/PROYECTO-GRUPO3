import React, { useState, useEffect, useRef } from "react"; 
import { Link } from "react-router-dom";
import "./LandingPage.css"; 
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight, FaCommentDots, FaTimes, FaPaperPlane } from 'react-icons/fa'; 

// Datos de los testimonios (sin cambios)
const todosLosTestimonios = [
  { id: 1, texto: "Buen trabajo, el equipo fue muy profesional y cumplió con lo requerido. ¡Totalmente recomendados!", autor: "Osito Peru", ciudad: "Lima", rating: 5, iconoComponente: FaQuoteLeft },
  { id: 2, texto: "5 estrellas, el servicio fue excelente y el equipo muy atento. Resolvieron todas mis dudas rápidamente.", autor: "Padre Domingo", ciudad: "Lima", rating: 5, iconoComponente: FaQuoteLeft },
  { id: 3, texto: "Encontré al freelancer perfecto para mi proyecto en cuestión de horas. La plataforma es muy intuitiva.", autor: "Ana López", ciudad: "Arequipa", rating: 5, iconoComponente: FaQuoteLeft },
  { id: 4, texto: "Como freelancer, LaboraPe me ha abierto puertas a clientes increíbles. ¡Muy agradecido!", autor: "Carlos Vidal", ciudad: "Cusco", rating: 5, iconoComponente: FaQuoteLeft },
  { id: 5, texto: "La calidad del trabajo entregado superó mis expectativas. Definitivamente volveré a usar la plataforma.", autor: "Sofía Martínez", ciudad: "Trujillo", rating: 5, iconoComponente: FaQuoteLeft },
  { id: 6, texto: "El soporte al cliente es de primera. Me ayudaron a resolver un pequeño inconveniente de forma eficaz.", autor: "Javier Torres", ciudad: "Chiclayo", rating: 5, iconoComponente: FaQuoteLeft },
  { id: 7, texto: "¡Qué fácil es publicar un proyecto y recibir propuestas! Me ahorró mucho tiempo y esfuerzo.", autor: "Gabriela Solano", ciudad: "Piura", rating: 5, iconoComponente: FaQuoteLeft },
  { id: 8, texto: "Los perfiles de los freelancers son muy completos y facilitan la elección del candidato ideal.", autor: "Ricardo Ponce", ciudad: "Iquitos", rating: 5, iconoComponente: FaQuoteLeft },
  { id: 9, texto: "He conseguido varios proyectos interesantes y bien remunerados gracias a LaboraPe. ¡La mejor plataforma!", autor: "Lucía Mendoza", ciudad: "Huancayo", rating: 5, iconoComponente: FaQuoteLeft },
  { id: 10, texto: "La seguridad en los pagos y la transparencia del proceso me dieron mucha confianza. ¡Excelente servicio!", autor: "Ernesto Vargas", ciudad: "Tacna", rating: 5, iconoComponente: FaQuoteLeft }
];

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <FaStar key={i} className={i < rating ? "star-filled" : "star-empty"} />
    );
  }
  return <div className="star-rating">{stars}</div>;
};


function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerPage = 2; 
  const nextTestimonials = () => { setCurrentIndex((prevIndex) => (prevIndex + testimonialsPerPage >= todosLosTestimonios.length ? 0 : prevIndex + testimonialsPerPage)); };
  const prevTestimonials = () => { setCurrentIndex((prevIndex) => (prevIndex - testimonialsPerPage < 0 ? Math.max(0, todosLosTestimonios.length - testimonialsPerPage) : prevIndex - testimonialsPerPage)); };
  const actualStartIndex = Math.max(0, Math.min(currentIndex, todosLosTestimonios.length - testimonialsPerPage));
  const testimoniosVisibles = todosLosTestimonios.slice(actualStartIndex, actualStartIndex + testimonialsPerPage);

  // --- INICIO: Estados y Lógica para el Chatbot ---
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBotLoading, setIsBotLoading] = useState(false); // Estado para el indicador de carga del bot
  const [chatMessages, setChatMessages] = useState([
    { id: Date.now(), text: "¡Hola! Soy tu asistente virtual de LaboraPe. ¿En qué puedo ayudarte hoy?", sender: 'bot' }
  ]);
  const [currentUserMessage, setCurrentUserMessage] = useState('');
  const chatBodyRef = useRef(null); // Ref para el cuerpo del chat para auto-scroll

  // Efecto para hacer scroll hacia abajo cuando llegan nuevos mensajes
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // --- NUEVA FUNCIÓN handleSendMessage CON LLAMADA A LA API ---
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const messageText = currentUserMessage.trim();
    if (messageText === '' || isBotLoading) return;

    const newUserMessage = { id: Date.now(), text: messageText, sender: 'user' };
    setChatMessages(prev => [...prev, newUserMessage]);
    setCurrentUserMessage('');
    setIsBotLoading(true); // Activa el indicador de carga

    try {
      const API_KEY = ''; // <-- REEMPLAZA ESTO
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;
      
      // El "prompt de sistema"
      const systemInstruction = "Eres 'LaboraPe Bot', un asistente virtual amigable y experto para la plataforma LaboraPe, un sitio que conecta clientes con freelancers en Perú. Tu única función es guiar a los usuarios sobre cómo usar la plataforma. No respondas preguntas sobre otros temas. Si no sabes la respuesta o te preguntan algo no relacionado, responde cortésmente: 'Mi especialidad es ayudarte a usar LaboraPe. ¿Tienes alguna pregunta sobre cómo registrarte, publicar un proyecto o postularte a uno?'. Responde siempre en español y de forma concisa.";
      
      // Prepara el historial de la conversación para enviarlo a la API
      const requestBody = {
        contents: [
          ...chatMessages.map(msg => ({
            role: msg.sender === 'bot' ? 'model' : 'user',
            parts: [{ text: msg.text }]
          })),
          {
            role: 'user',
            parts: [{ text: messageText }]
          }
        ],
        system_instruction: {
          parts: [{ text: systemInstruction }]
        }
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Hubo un problema con la API de IA.");
      }

      const data = await response.json();
      
      // Verifica que la respuesta tenga candidatos y contenido
      if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
        const botResponseText = data.candidates[0].content.parts[0].text;
        const botReply = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
        setChatMessages(prev => [...prev, botReply]);
      } else {
        // Maneja el caso de que la respuesta venga sin contenido (ej. por filtros de seguridad de Google AI)
        throw new Error("No se recibió una respuesta válida del bot. La pregunta puede haber sido bloqueada por políticas de seguridad.");
      }

    } catch (error) {
      console.error("Error al llamar a la API de Google AI:", error);
      const errorMessage = { id: Date.now() + 1, text: `Lo siento, ocurrió un error: ${error.message}`, sender: 'bot' };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsBotLoading(false); // Desactiva el indicador de carga
    }
  };
  // --- FIN: Estados y Lógica para el Chatbot ---

  return (
    <div className="landing-page-container">
      <header className="hero-section text-center text-white">
        <div className="container px-4 px-lg-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xl-7">
              <h1 className="hero-title display-4 fw-bolder mb-3">
                ¡Publica o postúlate a trabajos!
              </h1>
              <p className="hero-subtitle lead mb-5">
                Con LaboraPe podrás encontrar el trabajo que buscas o el freelancer
                que necesitas. ¡Únete a nuestra comunidad y comienza hoy mismo!
              </p>
              <div className="hero-buttons d-grid gap-3 d-sm-flex justify-content-sm-center">
                <Link className="btn btn-primary btn-lg px-4 me-sm-3 custom-btn-primary" to="/register/cliente">
                  Regístrate como Cliente
                </Link>
                <Link to="/register/freelancer" className="btn btn-outline-light btn-lg px-4 custom-btn-outline">
                  Regístrate como Freelancer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    
      <section className="testimonials-section py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center mb-5">
            <h2 className="section-title fw-bolder">Testimonios de Clientes</h2>
          </div>
          <div className="testimonials-carousel-container">
            {todosLosTestimonios.length > testimonialsPerPage && (
              <button onClick={prevTestimonials} className="carousel-arrow prev-arrow" aria-label="Anterior testimonio" disabled={actualStartIndex === 0} >
                <FaChevronLeft />
              </button>
            )}
            <div className="row gx-5 justify-content-center testimonials-row">
              {testimoniosVisibles.map((testimonio) => {
                const IconoTestimonio = testimonio.iconoComponente || FaQuoteLeft; 
                return (
                  <div className="col-md-6 col-lg-5 mb-5 testimonial-col" key={testimonio.id}>
                    <div className="card testimonial-card h-100 shadow border-0">
                      <div className="card-body p-4">
                        <StarRating rating={testimonio.rating} />
                        <div className="d-flex align-items-start mt-3">
                          <div className="flex-shrink-0 icon-container">
                            <IconoTestimonio className="testimonial-icon-default" />
                          </div>
                          <div className="ms-4">
                            <p className="testimonial-text mb-1">{testimonio.texto}</p>
                            <div className="testimonial-author small text-muted">- {testimonio.autor}, {testimonio.ciudad}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {todosLosTestimonios.length > testimonialsPerPage && (
              <button onClick={nextTestimonials} className="carousel-arrow next-arrow" aria-label="Siguiente testimonio" disabled={actualStartIndex >= todosLosTestimonios.length - testimonialsPerPage} >
                <FaChevronRight />
              </button>
            )}
          </div>
        </div>
      </section>
    
      {/* --- INICIO: Elementos del Chatbot --- */}
      <div className="chatbot-toggler" onClick={toggleChat} title="¿Necesitas ayuda?">
        {isChatOpen ? <FaTimes /> : <FaCommentDots />} 
        {!isChatOpen && <span className="chatbot-tooltip-text">¿Te puedo ayudar en algo?</span>}
      </div>
    
      {isChatOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            Asistente Virtual LaboraPe
            <button onClick={toggleChat} className="chatbot-close-btn" aria-label="Cerrar chat">
              <FaTimes />
            </button>
          </div>
          <div className="chatbot-body" ref={chatBodyRef}>
            {chatMessages.map(msg => (
              <div key={msg.id} className={`chat-message ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
            {/* Indicador de carga: se muestra mientras el bot está respondiendo */}
            {isBotLoading && (
              <div className="chat-message bot loading-dots">
                <p><span>.</span><span>.</span><span>.</span></p>
              </div>
            )}
          </div>
          <form className="chatbot-footer" onSubmit={handleSendMessage}>
            <input 
              type="text" 
              value={currentUserMessage}
              onChange={(e) => setCurrentUserMessage(e.target.value)}
              placeholder="Escribe tu mensaje..." 
              aria-label="Escribe tu mensaje"
              disabled={isBotLoading} // Deshabilita el input mientras el bot responde
            />
            <button type="submit" aria-label="Enviar mensaje" disabled={isBotLoading}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
      {/* --- FIN: Elementos del Chatbot --- */}
    
    </div>
  );
}

export default LandingPage;
