import "../App.css";
import "../PaginasUsuario/LandingPage.css";

function LandingPage() {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container px-5">
            <a className="navbar-brand" href="#!">
              LaboraPe
            </a>
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
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#!">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#!">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#!">
                    Contact
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#!">
                    Services
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <header className="bg-dark py-5">
          <div classNameName="container px-5">
            <div classNameName="row gx-5 justify-content-center">
              <div className="col-lg-6">
                <div className="text-center my-5">
                  <h1 className="display-5 fw-bolder text-white mb-2">
                    Present your business in a whole new way
                  </h1>
                  <p className="lead text-white-50 mb-4">
                    Quickly design and customize responsive mobile-first sites
                    with Bootstrap, the world’s most popular front-end open
                    source toolkit!
                  </p>
                  <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                    <a
                      className="btn btn-primary btn-lg px-4 me-sm-3"
                      href="#features"
                    >
                      Get Started
                    </a>
                    <a className="btn btn-outline-light btn-lg px-4" href="#!">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <section className="py-5 border-bottom" id="features">
          <div className="container px-5 my-5">
            <div className="row gx-5">
              <div className="col-lg-4 mb-5 mb-lg-0">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                  <i className="bi bi-collection"></i>
                </div>
                <h2 className="h4 fw-bolder">Featured title</h2>
                <p>
                  Paragraph of text beneath the heading to explain the heading.
                  We'll add onto it with another sentence and probably just keep
                  going until we run out of words.
                </p>
                <a className="text-decoration-none" href="#!">
                  Call to action
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
              <div className="col-lg-4 mb-5 mb-lg-0">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                  <i className="bi bi-building"></i>
                </div>
                <h2 className="h4 fw-bolder">Featured title</h2>
                <p>
                  Paragraph of text beneath the heading to explain the heading.
                  We'll add onto it with another sentence and probably just keep
                  going until we run out of words.
                </p>
                <a className="text-decoration-none" href="#!">
                  Call to action
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
              <div className="col-lg-4">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                  <i className="bi bi-toggles2"></i>
                </div>
                <h2 className="h4 fw-bolder">Featured title</h2>
                <p>
                  Paragraph of text beneath the heading to explain the heading.
                  We'll add onto it with another sentence and probably just keep
                  going until we run out of words.
                </p>
                <a className="text-decoration-none" href="#!">
                  Call to action
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </section>
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
                          Buen trabajo, el equipo fue muy profesional y cumplió con lo requerido.
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
                          5 estrellas, el servicio fue excelente y el equipo muy atento.
                        </p>
                        <div className="small text-muted">
                          - John Doe, Lima
                        </div>
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
