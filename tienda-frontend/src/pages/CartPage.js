// import { Elements } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import "./CartPage.css";
import { useSelector } from "react-redux";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import {
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useRemoveFromCartMutation,
} from "../services/appApi";
import CheckoutForm from "../components/CheckoutForm";

//import AlerCantidadProducts from "../components/AlertCantidadProducts";

function CartPage() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const userCartObj = user.cart;
  let cart = products.filter((product) => userCartObj[product._id] != null);
  const [increaseCart] = useIncreaseCartProductMutation();
  const [decreaseCart] = useDecreaseCartProductMutation();
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

  const [showAlert, setShowAlert] = useState(false);

  function handleDecrease(product) {
    const quantity = user.cart[product.productId];
    if (quantity <= 0) {
      setShowAlert(true);
      return 0;
    }
    decreaseCart(product);
  }

  return (
    <Container style={{ minHeight: "95vh" }} className="cart-container">
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          No es posible seguir disminuyendo la cantidad de este producto.
        </Alert>
      )}

      {/* ----- ALERTA OPCIONAL ---  */}
      {/* {showAlert && (
        <AlerCantidadProducts
          bg="warning"
          title="Aviso"
          body="No puedes seguir disminuyendo la cantidad de productos"
        />
      )} */}

      <Row>
        <Col md={7}>
          <h1 className="pt-2 h3">Carrito de Compras 🛒</h1>
          {cart.length === 0 ? (
            <div class="alert alert-warning" role="alert">
              No hay productos en el carrito, puedes agregar productos desde la
              sección de productos.
            </div>
          ) : (
            <div>
              <CheckoutForm />
            </div>
          )}
        </Col>
        <Col md={5}>
          {cart.length > 0 && (
            <>
              <Table responsive="sm" className="cart-table">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Sub Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Recorrer productos del carrito de compras */}

                  {cart.map((item) => (
                    <tr>
                      <td>&nbsp;</td>
                      <td>
                        {!isLoading && (
                          <i
                            className="fa fa-times-circle"
                            style={{
                              marginRight: 10,
                              cursor: "pointer",
                              color: "#f20707",
                            }}
                            onClick={() =>
                              removeFromCart({
                                productId: item._id,
                                price: item.price,
                                userId: user._id,
                              })
                            }
                          ></i>
                        )}
                        <img
                          alt="productsimg"
                          src={item.pictures[0].url}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                          }}
                          className="rounded-circle"
                        />
                      </td>
                      <td>Q {item.price}</td>
                      <td>{user.cart[item._id]}</td>
                      <td>Q {item.price * user.cart[item._id]}</td>
                      <td>
                        <span className="quantity-indicator">
                          <i
                            class="fa fa-minus-circle"
                            onClick={() =>
                              handleDecrease({
                                productId: item._id,
                                price: item.price,
                                userId: user._id,
                              })
                            }
                            style={{ color: "#f26507" }}
                          ></i>
                          <i
                            class="fa fa-plus-circle"
                            onClick={() =>
                              increaseCart({
                                productId: item._id,
                                price: item.price,
                                userId: user._id,
                              })
                            }
                            style={{ color: "#f26507" }}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>
                <h3 className="h4 pt-4">Total: Q {user.cart.total}</h3>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default CartPage;

//npm i @stripe/react-stripe-js
//npm i @stripe/stripe-js
