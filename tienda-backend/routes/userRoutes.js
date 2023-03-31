const router = require("express").Router();
const User = require("../models/User");
const Order = require("../models/Order");

// Ruta para registrar un nuevo usuario
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Se crea un nuevo usuario con los datos recibidos en el cuerpo de la solicitud
    const user = await User.create({ name, email, password });
    res.json(user);
  } catch (e) {
    // Si el email ya existe en la DB, se envía una respuesta de error
    if (e.code === 11000) return res.status(400).send("El email ya existe");
    res.status(400).send(e.message);
  }
});

// Ruta para iniciar sesión de un usuario existente
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Se busca el usuario en la DB por su email y contraseña
    const user = await User.findByCredentials(email, password);
    res.json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Ruta para obtener todos los usuarios no administradores y sus respectivas órdenes
router.get("/", async (req, res) => {
  try {
    // Se buscan todos los usuarios que no son administradores y se obtienen sus órdenes a través de la función populate
    const users = await User.find({ isAdmin: false }).populate("orders");
    res.json(users);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Ruta para obtener todas las órdenes de un usuario específico
router.get("/:id/orders", async (req, res) => {
  const { id } = req.params;
  try {
    // Se busca el usuario por su ID y se obtienen sus órdenes a través de la función populate
    const user = await User.findById(id).populate("orders");
    res.json(user.orders);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
