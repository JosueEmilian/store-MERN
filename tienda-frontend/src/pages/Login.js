import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isError, isLoading, error }] = useLoginMutation();

  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="login__image--container"></Col>
        <Col md={6} className="login__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleLogin}>
            <h1 class="text-danger font-weight-bold">Inicio de Sesion</h1>
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group>
              <Form.Label class="text-danger">Correo Electronico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su correo"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label class="text-danger">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <button
                type="submit"
                class="btn btn-warning"
                disabled={isLoading}
              >
                Ingresa
              </button>
            </Form.Group>
            <p className="pt-3 text-center">
              Quieres registrarte?
              <Link to="/signup">Crear Cuenta</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
