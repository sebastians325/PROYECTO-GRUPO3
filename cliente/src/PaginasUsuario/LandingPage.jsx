import React, { useState } from "react"; 
import "./LandingPage.css"; 
import { Link } from "react-router-dom";

// Iconos para testimonios y estrellas de react-icons
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 

// Datos de los testimonios
const todosLosTestimonios = [
  {
    id: 1,
    texto: "Buen trabajo, el equipo fue muy profesional y cumplió con lo requerido. ¡Totalmente recomendados!",
    autor: "Osito Peru",
    ciudad: "Lima",
    rating: 5,
    iconoComponente: FaQuoteLeft 
  },
  {
    id: 2,
    texto: "5 estrellas, el servicio fue excelente y el equipo muy atento. Resolvieron todas mis dudas rápidamente.",
    autor: "Padre Domingo",
    ciudad: "Lima",
    rating: 5,
    iconoComponente: FaQuoteLeft
  },
  {
    id: 3,
    texto: "Encontré al freelancer perfecto para mi proyecto en cuestión de horas. La plataforma es muy intuitiva.",
    autor: "Ana López",
    ciudad: "Arequipa",
    rating: 5,
    iconoComponente: FaQuoteLeft
  },
  {
    id: 4,
    texto: "Como freelancer, LaboraPe me ha abierto puertas a clientes increíbles. ¡Muy agradecido!",
    autor: "Carlos Vidal",
    ciudad: "Cusco",
    rating: 5,
    iconoComponente: FaQuoteLeft
  },
  {
    id: 5,
    texto: "La calidad del trabajo entregado superó mis expectativas. Definitivamente volveré a usar la plataforma.",
    autor: "Sofía Martínez",
    ciudad: "Trujillo",
    rating: 5,
    iconoComponente: FaQuoteLeft
  },
  {
    id: 6,
    texto: "El soporte al cliente es de primera. Me ayudaron a resolver un pequeño inconveniente de forma eficaz.",
    autor: "Javier Torres",
    ciudad: "Chiclayo",
    rating: 5,
    iconoComponente: FaQuoteLeft
  },
  {
    id: 7,
    texto: "¡Qué fácil es publicar un proyecto y recibir propuestas! Me ahorró mucho tiempo y esfuerzo.",
    autor: "Gabriela Solano",
    ciudad: "Piura",
    rating: 5,
    iconoComponente: FaQuoteLeft
  },
  {
    id: 8,
    texto: "Los perfiles de los freelancers son muy completos y facilitan la elección del candidato ideal.",
    autor: "Ricardo Ponce",
    ciudad: "Iquitos",
    rating: 5,
    iconoComponente: FaQuoteLeft
  },
  {
    id: 9,
    texto: "He conseguido varios proyectos interesantes y bien remunerados gracias a LaboraPe. ¡La mejor plataforma!",
    autor: "Lucía Mendoza",
    ciudad: "Huancayo",
    rating: 5,
    iconoComponente: FaQuoteLeft
  },
  {
    id: 10,
    texto: "La seguridad en los pagos y la transparencia del proceso me dieron mucha confianza. ¡Excelente servicio!",
    autor: "Ernesto Vargas",
    ciudad: "Tacna",
    rating: 5,
    iconoComponente: FaQuoteLeft
  }
];

// Componente para renderizar las estrellas de calificación
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
  // Estado para controlar el índice del primer testimonio visible en el carrusel
  const [currentIndex, setCurrentIndex] = useState(0);
  // Número de testimonios a mostrar a la vez
  const testimonialsPerPage = 2; 

  // Función para ir al siguiente conjunto de testimonios
  const nextTestimonials = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + testimonialsPerPage;
      // Si newIndex se pasa del total de testimonios, vuelve al inicio.
      return newIndex >= todosLosTestimonios.length ? 0 : newIndex; 
    });
  };

  // Función para ir al conjunto anterior de testimonios
  const prevTestimonials = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - testimonialsPerPage;
      // Si newIndex es negativo, ve al último conjunto de testimonios (ajustado para que no se pase si hay pocos testimonios).
      return newIndex < 0 ? Math.max(0, todosLosTestimonios.length - testimonialsPerPage) : newIndex; 
    });
  };
  
  const actualStartIndex = Math.max(0, Math.min(currentIndex, todosLosTestimonios.length - testimonialsPerPage));

  const testimoniosVisibles = todosLosTestimonios.slice(
    actualStartIndex,
    actualStartIndex + testimonialsPerPage
  );

  return (
    <div className="landing-page-container">
      <header className="hero-section text-center text-white">
        <div className="container px-4 px-lg-5">
          <h1 className="hero-title display-4 fw-bolder mb-3">
            ¡Publica o postúlate a trabajos!
          </h1>
          <p className="hero-subtitle lead mb-5">
            Con LaboraPe podrás encontrar el trabajo que buscas o el freelancer
            que necesitas. ¡Únete a nuestra comunidad y comienza hoy mismo!
          </p>
          <div className="hero-buttons d-grid gap-3 d-sm-flex justify-content-sm-center">
            <Link
              className="btn btn-primary btn-lg px-4 me-sm-3 custom-btn-primary"
              to="/register/cliente"
            >
              Regístrate como Cliente
            </Link>
            <Link
              to="/register/freelancer"
              className="btn btn-outline-light btn-lg px-4 custom-btn-outline"
            >
              Regístrate como Freelancer
            </Link>
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
              <button 
                onClick={prevTestimonials} 
                className="carousel-arrow prev-arrow" 
                aria-label="Anterior testimonio"
                disabled={actualStartIndex === 0} 
              >
                <FaChevronLeft />
              </button>
            )}

            <div className="row gx-5 justify-content-center testimonials-row">
              {testimoniosVisibles.map((testimonio) => {
                // Renderiza el componente de icono si existe en los datos, sino usa FaQuoteLeft por defecto
                const IconoTestimonio = testimonio.iconoComponente || FaQuoteLeft; 
                return (
                  <div className="col-lg-5 mb-5 testimonial-col" key={testimonio.id}>
                    <div className="card testimonial-card h-100 shadow border-0">
                      <div className="card-body p-4">
                        <StarRating rating={testimonio.rating} />
                        <div className="d-flex align-items-start mt-3">
                          <div className="flex-shrink-0 icon-container">
                            <IconoTestimonio className="testimonial-icon-default" />
                          </div>
                          <div className="ms-4">
                            <p className="testimonial-text mb-1">
                              {testimonio.texto}
                            </p>
                            <div className="testimonial-author small text-muted">
                              - {testimonio.autor}, {testimonio.ciudad}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Botón para ir al siguiente testimonio, se muestra si hay más testimonios que los visibles por página */}
            {todosLosTestimonios.length > testimonialsPerPage && (
              <button 
                onClick={nextTestimonials} 
                className="carousel-arrow next-arrow" 
                aria-label="Siguiente testimonio"
                // Deshabilitar si estamos en el último grupo de testimonios
                disabled={actualStartIndex >= todosLosTestimonios.length - testimonialsPerPage}
              >
                <FaChevronRight />
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
