import React from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../services/appApi";
import axios from "../axios";
import "./NewProduct.css";
// require("dotenv").config();

export default function NewProduct() {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [nombreTienda, setNombreTienda] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [imgToRemove, setImgToRemove] = React.useState(null);
  const [images, setImages] = React.useState([]);
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();

  function handleRemoveImg(imgObj) {
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImgToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description || !price || !category || !images.length) {
      return alert("Todos los campos son obligatorios");
    }
    createProduct({ name, description, price, category, images }).then(
      ({ data }) => {
        if (data.length > 0) {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      }
    );
  }

  function showWidget() {
    // const cloudNamee = process.env.CLOUD_NAME;
    // const uploadPresett = process.env.UPLOAD_PRESET;

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dsyj0wwnn",
        uploadPreset: "dhxsahx9",
      },

      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );

    widget.open();
  }

  return (
    <Container>
      <Row className="mt-4">
        <Col md={6} className="new-product__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1 class="mt-4 text-danger font-weight-bold">
              Ingreso de Productos
            </h1>
            {isSuccess && (
              <Alert variant="success">Producto Ingresado Correctamente</Alert>
            )}

            {isError && <Alert variant="danger"> {error.data}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label class="text-danger">Nombre Producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el producto"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label class="text-danger">Descripcion Producto</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ingrese la descripcion"
                style={{ height: "100px" }}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label class="text-danger">Precio Producto</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese el precio"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setCategory(e.target.value)}
            >
              <Form.Label class="text-danger">Categoria</Form.Label>
              <Form.Select>
                <option disabled selected>
                  Seleccion la categoria
                </option>
                <option value="bebidas">bebidas</option>
                <option value="alimentos">alimentos</option>
                <option value="limpieza">limpieza</option>
                <option value="medicamentos">Medicamentos</option>
                <option value="Enlatados">Enlatados</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label class="text-danger">Nombre Tienda</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de la tienda"
                value={nombreTienda}
                required
                onChange={(e) => setNombreTienda(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Button
                type="button"
                className="btn btn-warning"
                onClick={showWidget}
              >
                Agrega Imagen
              </Button>
              <div className="images-preview-container">
                {images.map((image) => (
                  <div className="image-preview">
                    <img alt="" src={image.url} />

                    {imgToRemove !== image.public_id && (
                      <i
                        className="fa fa-times-circle"
                        onClick={() => handleRemoveImg(image)}
                      ></i>
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <button
                type="submit"
                class="btn btn-warning"
                disabled={isLoading || isSuccess}
              >
                Registrar Producto
              </button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="new-product__image--container"></Col>
      </Row>
    </Container>
  );
}
