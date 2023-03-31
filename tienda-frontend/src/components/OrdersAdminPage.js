import React, { useEffect, useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "./Loading";

function OrdersAdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products);
  // const [orderToShow, setOrderToShow] = useState([]);
  // const [show, setShow] = useState(false);

  function markShipped(orderId, ownerId) {}

  function showOrder(order) {}

  useEffect(() => {
    setLoading(true);
    axios
      .get("/orders")
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h1 className="text-center pt-4">Aun no existen ordenes</h1>;
  }

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Orden ID</th>
          <th>Cliente</th>
          <th>Direccion</th>
          <th>Total</th>
          <th>Items</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr>
            <td>{order._id}</td>
            <td>{order.owner?.name}</td>
            <td>
              {order.address}, {order.country}
            </td>
            <td>Q {order.total}</td>

            <td>
              {order.status === "Procesando" ? (
                <Button
                  size="sm"
                  onClick={() => markShipped(order.id, order.owner?._id)}
                  className="btn btn-warning"
                >
                  Marcar como enviado
                </Button>
              ) : (
                <Badge bg="success">Enviado</Badge>
              )}
            </td>
            <td>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => showOrder(products)}
              >
                Ver orden{" "}
                <i className="fa fa-eye" style={{ color: "#f36839" }}></i>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default OrdersAdminPage;

//6.06.42
