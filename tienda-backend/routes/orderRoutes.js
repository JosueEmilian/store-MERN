const router = require("express").Router();
const Order = require("../models/Order");
const User = require("../models/User");

//Maneja la creación de una orden por parte del usuario.
router.post("/", async (req, res) => {
  //Se obtiene el objeto socket.io del objeto app.
  const io = req.app.get("socketio");

  // Se obtienen los datos de la solicitud,
  const { userId, cart, country, address, phone } = req.body;
  try {
    // Se busca el usuario por su id.
    const user = await User.findById(userId);

    // Se crea la orden con los datos proporcionados.
    const order = await Order.create({
      owner: user._id,
      products: cart,
      country,
      address,
      phone,
    });

    // Se establece el total y la cantidad de productos en la orden.
    order.count = cart.count;
    order.total = cart.total;

    // Se guarda la orden en la DB
    await order.save();

    // Se actualiza el carrito del usuario a cero.
    user.cart = { total: 0, count: 0 };

    // Se agrega la orden a la lista de órdenes del usuario.
    user.orders.push(order);

    // Se crea una notificación con el nombre del usuario.
    const notification = {
      status: "unread",
      message: `Nueva orden de ${user.name}`,
      time: new Date(),
    };

    // Se emite una notificación de nueva orden a través de todos los sockets conectados.
    io.sockets.emit("new-order", notification);

    // Se marca la lista de órdenes del usuario como modificada.
    user.markModified("orders");

    // Se guarda el usuario actualizado en la base de datos.
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

// Obteniendo todas las órdenes
router.get("/", async (req, res) => {
  try {
    // Obteniendo todas las órdenes y populando la referencia del propietario con su email y nombre.
    const orders = await Order.find().populate("owner", ["email", "name"]);
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

// Actualiza el estado de un pedido a 'enviado'
router.patch("/:id/mark-shipped", async (req, res) => {
  const io = req.app.get("socketio");
  const { ownerId } = req.body; // El ID del dueño del pedido
  const { id } = req.params; // El ID del pedido que se va a actualizar

  try {
    const user = await User.findById(ownerId); // Busca el usuario por su ID
    await Order.findByIdAndUpdate(id, { status: "Enviado" }); // Actualiza el pedido con el nuevo estado 'enviado'
    const orders = await Order.find().populate("owner", ["email", "name"]); // Encuentra todos los pedidos y los devuelve con la información del dueño

    const notification = {
      status: "unread",
      message: `Order ${id} shipped with success`, // Crea un mensaje de notificación para el usuario
      time: new Date(),
    };
    io.sockets.emit("notification", notification, ownerId); // Envía la notificación al cliente a través de WebSockets
    user.notifications.push(notification); // Añade la notificación al array de notificaciones del usuario
    await user.save(); // Guarda los cambios en el usuario
    res.status(200).json(orders); // Devuelve los pedidos actualizados
  } catch (e) {
    res.status(400).json(e.message);
  }
});
module.exports = router;
