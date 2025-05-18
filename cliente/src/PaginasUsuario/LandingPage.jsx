import "../App.css";
import "../PaginasUsuario/LandingPage.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container px-5">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            ></div>
          </div>
        </nav>
        <header className="bg-dark py-5">
          <div className="container px-5">
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-6">
                <div className="text-center my-5">
                  <h1 className="display-5 fw-bolder text-white mb-2">
                    ¡Publica o postúlate a trabajos!
                  </h1>
                  <p className="lead text-white-50 mb-4">
                    Con LaboraPe podrás encontrar el trabajo que buscas o el freelancer
                    que necesitas. ¡Únete a nuestra comunidad y comienza hoy mismo!
                  </p>
                  <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                    <Link
                      className="btn btn-primary btn-lg px-4 me-sm-3"
                      to="/register/cliente"
                    >
                      Registrate como cliente
                    </Link>
                    <Link
                      to="/register/freelancer"
                      className="btn btn-outline-light btn-lg px-4"
                    >
                      Regístrate como freelancer
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <section className="py-5 border-bottom">
          <div className="container px-5 my-5 px-5">
            <div className="text-center mb-5">
              <h2 className="fw-bolder">Testimonios de Clientes</h2>
            </div>
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-6">
                <div className="card mb-4">
                  <div className="card-body p-4">
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <i className="bi bi-chat-right-quote-fill text-primary fs-1"></i>
                      </div>
                      <div className="ms-4">
                        <p className="mb-1">
                          Buen trabajo, el equipo fue muy profesional y cumplió
                          con lo requerido.
                        </p>
                        <div className="small text-muted">
                          - Osito Peru, Lima
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body p-4">
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <i className="bi bi-chat-right-quote-fill text-primary fs-1"></i>
                      </div>
                      <div className="ms-4">
                        <p className="mb-1">
                          5 estrellas, el servicio fue excelente y el equipo muy
                          atento.
                        </p>
                        <div className="small text-muted">- Padre Domingo, Lima</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default LandingPage;
