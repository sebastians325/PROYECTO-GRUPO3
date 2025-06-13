import React, { useState, useEffect } from "react"; 
import "./LandingPage.css"; 
import { Link } from "react-router-dom";
import { ReviewService } from "../services/reviewsService";

// Iconos para testimonios y estrellas de react-icons
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 

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
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerPage = 2;

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const fetchedReviews = await ReviewService.getReviews();
      const formattedReviews = fetchedReviews.map(review => ({
        id: review.id,
        texto: review.comentario,
        autor: review.cliente?.nombre || 'Usuario Anónimo',
        ciudad: "Perú",
        rating: review.calificacion,
        iconoComponente: FaQuoteLeft
      }));
      setReviews(formattedReviews);
    } catch (err) {
      setError('Error al cargar las reseñas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Función para ir al siguiente conjunto de testimonios
  const nextTestimonials = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + testimonialsPerPage;
      return newIndex >= reviews.length ? 0 : newIndex; 
    });
  };

  // Función para ir al conjunto anterior de testimonios
  const prevTestimonials = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - testimonialsPerPage;
      return newIndex < 0 ? Math.max(0, reviews.length - testimonialsPerPage) : newIndex; 
    });
  };

  const actualStartIndex = Math.max(0, Math.min(currentIndex, reviews.length - testimonialsPerPage));
  const testimoniosVisibles = reviews.slice(
    actualStartIndex,
    actualStartIndex + testimonialsPerPage
  );

  if (loading) {
    return <div className="loading-spinner">Cargando reseñas...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

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
            {reviews.length > testimonialsPerPage && (
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

            {reviews.length > testimonialsPerPage && (
              <button 
                onClick={nextTestimonials} 
                className="carousel-arrow next-arrow" 
                aria-label="Siguiente testimonio"
                disabled={actualStartIndex >= reviews.length - testimonialsPerPage}
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
