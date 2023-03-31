// Configuración y ejecución del servidor de Express

const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
require("dotenv").config();
require("./connection");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: process.env.CORS,
  methods: ["GET", "POST", "PATCH", "DELETE"],
});
const port = process.env.PORT || 8081;

const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const imageRoutes = require("./routes/imagesRoutes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/images", imageRoutes);

server.listen(port, () => {
  console.log("Servidor iniciado en el puerto", port);
});

app.set("socketio", io);
