import React from "react";
import { Container, Nav, Tab, Col, Row } from "react-bootstrap";
// import axios from "../axios";
import DashboardPrdoucts from "../components/DashboardPrdoucts";
import OrdersAdminPage from "../components/OrdersAdminPage";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <Container>
      <Tab.Container defaultActiveKey="products">
        <Row>
          <Col sm={3}>
            <Nav
              variant="pills"
              className="flex-column"
              style={{ backgroundColor: "#fff" }}
            >
              <Nav.Item>
                <Nav.Link eventKey="products" style={{ color: "#FF7000" }}>
                  Productos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="orders" style={{ color: "#FF7000" }}>
                  Ordenes
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="clients" style={{ color: "#FF7000" }}>
                  Clientes
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            {/* Revisar --> o crer  sidebar */}
            <Tab.Content>
              <Tab.Pane eventKey="products">
                <DashboardPrdoucts />
              </Tab.Pane>
            </Tab.Content>

            <Tab.Content>
              <Tab.Pane eventKey="orders">
                <OrdersAdminPage />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default AdminDashboard;
