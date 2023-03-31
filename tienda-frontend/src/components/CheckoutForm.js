import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi";

function CheckoutForm() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [createOrder, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");

  function handlePay(e) {
    e.preventDefault();
    createOrder({ userId: user._id, cart: user.cart, address, country }).then(
      (res) => {
        if (!isLoading && !isError) {
          setAlertMessage("Orden Creada con exito");
          setTimeout(() => {
            navigate("/orders");
          }, 3000);
        }
      }
    );
  }

  return (
    <Col className="cart-payment-container">
      <Form onSubmit={handlePay}>
        <Row>
          {alertMessage && <Alert>{alertMessage}</Alert>}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={user.name}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Correo Electronico</Form.Label>
              <Form.Control
                type="text"
                placeholder="Correo Electronico"
                value={user.email}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={7}>
            <Form.Group className="mb-3">
              <Form.Label>Direccion Exacta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Departamento"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group className="mb-3">
              <Form.Label>Departamento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Municipio"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        {/* <label htmlFor="card-element">Tarjeta</label> */}
        <Button
          className="mt-3 bg-warning btn btn-warning"
          type="submit"
          disabled={user.cart.count <= 0 || isLoading || isSuccess}
        >
          {isLoading ? "Procesando..." : "Crear Orden"}
        </Button>
      </Form>
    </Col>
  );
}

export default CheckoutForm;
