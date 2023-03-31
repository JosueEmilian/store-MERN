import React from "react";
import {
  Navbar,
  Button,
  Nav,
  NavDropdown,
  Container,
  ButtonGroup,
  NavLink,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../features/userSlice";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Navbar className="bg-warning" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>TIENDA DE BARRIO</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Si no existe usuario */}
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link>Iniciar Sesion</Nav.Link>
              </LinkContainer>
            )}

            {user && !user.isAdmin && (
              <LinkContainer to="/carrito">
                <NavLink>
                  <i
                    className="fas fa-cart-plus"
                    style={{ fontSize: "24px" }}
                  ></i>
                  {user?.cart.count > 0 && (
                    <span className="badge badge-warning" id="cartcount">
                      {user.cart.count}
                    </span>
                  )}
                </NavLink>
              </LinkContainer>
            )}

            {/* Si existe usuario */}
            {user && (
              <NavDropdown title={`${user.name}`} id="basic-nav-dropdown">
                {/* Si el usuario es admin */}
                {user.isAdmin && (
                  <>
                    <LinkContainer to="/admin">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/new-product">
                      <NavDropdown.Item>Agregar Productos</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}

                {!user.isAdmin && (
                  <>
                    <LinkContainer to="/carrito">
                      <NavDropdown.Item>Carrito</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/orders">
                      <NavDropdown.Item>Lista de pedido</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}

                <NavDropdown.Divider />
                <Button
                  variant="warning"
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Cerrar Sesion
                </Button>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
