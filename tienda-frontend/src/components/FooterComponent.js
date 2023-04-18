import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-light">
      <Container>
        <Row className="gap-5 py-5">
          <Col md={3}>
            <h2 className="mb-4 text-uppercase">Tienda de barrio</h2>
            <ul className="list-unstyled text-muted">
              <li className="mb-2">
                <a
                  href="*"
                  className="text-reset text-decoration-none hover-underline"
                >
                  Acerca De
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="*"
                  className="text-reset text-decoration-none hover-underline"
                >
                  productos
                </a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h2 className="mb-4 text-uppercase">Legal</h2>
            <ul className="list-unstyled text-muted">
              <li className="mb-2">
                <a
                  href="*"
                  className="text-reset text-decoration-none hover-underline"
                >
                  Politicas de Privacidad
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="*"
                  className="text-reset text-decoration-none hover-underline"
                >
                  Licencia
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="*"
                  className="text-reset text-decoration-none hover-underline"
                >
                  Terminos &amp; Condiciones
                </a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h2 className="mb-4 text-uppercase">Información</h2>
            <ul className="list-unstyled text-muted">
              <li className="mb-2">
                <a
                  href="*"
                  className="text-reset text-decoration-none hover-underline"
                >
                  Fotografía
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="*"
                  className="text-reset text-decoration-none hover-underline"
                >
                  Calificación de usuarios
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="*"
                  className="text-reset text-decoration-none hover-underline"
                >
                  Localización
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="*"
                  className="text-reset text-decoration-none hover-underline"
                >
                  Contactos
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="*"
                  className="text-reset text-decoration-none hover-underline"
                >
                  Reseñas
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="py-3 px-4 bg-secondary text-muted justify-content-md-between align-items-center">
          <div className="col-md-auto text-dark">
            <span className="text-small">&copy; 2023 Tienda de Barrio</span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
