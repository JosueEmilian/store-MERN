import React, { useState } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./DashboardProducts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useDeleteProductMutation } from "../services/appApi";

function DashboardProducts() {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);

  const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
  const [showAlert, setShowAlert] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isProductDeleted, setIsProductDeleted] = useState(false);

  function handleDeleteProduct(product) {
    setProductToDelete(product);
    setShowAlert(true);
  }

  function handleConfirmDelete() {
    deleteProduct({ product_id: productToDelete._id, user_id: user._id });
    setShowAlert(false);
    setProductToDelete(null);
    setIsProductDeleted(true);
  }

  function handleCancelDelete() {
    setShowAlert(false);
    setProductToDelete(null);
  }

  return (
    <>
      {showAlert && (
        <div className="alert-overlay">
          <div className="alert-box">
            <p>¿Estás seguro de eliminar el producto {productToDelete.name}?</p>
            <Button
              variant="danger"
              onClick={handleConfirmDelete}
              disabled={isLoading}
            >
              Eliminar
            </Button>
            <Button variant="secondary" onClick={handleCancelDelete}>
              Cancelar
            </Button>
          </div>
        </div>
      )}
      {isProductDeleted && (
        <Alert
          variant="success"
          onClose={() => setIsProductDeleted(false)}
          dismissible
        >
          El producto se eliminó correctamente.
        </Alert>
      )}
      <Table responsive className="table">
        <thead>
          <tr>
            <th></th>
            <th>ID Producto</th>
            <th>Producto</th>
            <th>Precio </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  alt="product"
                  src={product.pictures[0].url}
                  className="dashboard-product-preview"
                />
              </td>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>Q {product.price}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => handleDeleteProduct(product)}
                  disabled={isLoading}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <Link
                  to={`/product/${product._id}/edit`}
                  className="btn btn-warning"
                >
                  <FontAwesomeIcon
                    style={{ color: "white" }}
                    icon={faPenToSquare}
                  />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default DashboardProducts;
