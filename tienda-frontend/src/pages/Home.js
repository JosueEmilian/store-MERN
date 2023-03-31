import axios from "../axios";
import React, { useEffect } from "react";
import { Col, Navbar, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import categories from "../categories";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";
// import tiendaImg from "../images/banner.jpg";
import tiendaImg2 from "../images/1banner.jpg";
import FooterComponent from "../components/FooterComponent";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 12);

  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, []);

  return (
    <div>
      <div className="recent-products-container container mt-4">
        <h2>Categorias</h2>
        <Row>
          {categories.map((category) => (
            <LinkContainer
              to={`/category/${category.name.toLocaleLowerCase()}`}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${category.img})`,
                    gap: "5px",
                  }}
                  className="category-tile"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
      {/* <img src={tiendaImg} alt="img-banner" className="home-banner" /> */}
      <div className="featured-products-container container mt-4">
        {/* Desde el backend */}
        <h2>Productos</h2>

        <div className="d-flex justify-content-center flex-wrap">
          {lastProducts.map((product) => (
            <ProductPreview {...product} />
          ))}
        </div>

        <div>
          <Link
            to="/category/Todos los Productos"
            style={{
              textAlign: "center",
              display: "block",
              textDecoration: "none",
              fontSize: "2.1 rem",
              color: "#FF8548",
            }}
          >
            VER TODOS LOS PRODUCTOS... {"🔍"}
          </Link>
        </div>
      </div>

      {/* Imagen principal de venta */}
      <div className="sale__banner--container mt-4">
        <img src={tiendaImg2} alt="img-banner2"></img>
      </div>
      <div>
        <h1></h1>
      </div>
      <FooterComponent />
    </div>
  );
}

export default Home;
