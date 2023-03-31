const router = require("express").Router();
const Product = require("../models/Product");
const User = require("../models/User");

// Ruta GET para obtener todos los productos en orden descendente
router.get("/", async (req, res) => {
  try {
    const sort = { _id: -1 }; // Definir el ordenamiento para la búsqueda de productos
    const products = await Product.find().sort(sort); // Buscar todos los productos y ordenarlos según la variable 'sort'
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Creacion de productos
router.post("/", async (req, res) => {
  try {
    // extraemos los datos del cuerpo de la solicitud
    const { name, description, price, category, images: pictures } = req.body;
    // creamos un nuevo producto en la DB
    const product = await Product.create({
      name,
      description,
      price,
      category,
      pictures,
    });
    // buscamos todos los productos en la DB
    const products = await Product.find();
    res.status(201).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Actualizacion de productos
router.patch("/:id", async (req, res) => {
  const { id } = req.params; // Obtener el ID del producto a actualizar
  try {
    const { name, description, price, category, images: pictures } = req.body; // Obtener los nuevos datos del producto
    const product = await Product.findByIdAndUpdate(id, {
      // Buscar y actualizar el producto en la DB
      name,
      description,
      price,
      category,
      pictures,
    });
    const products = await Product.find(); // Obtener todos los productos actualizados
    res.status(201).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Eliminacion de productos
router.delete("/:id", async (req, res) => {
  const { id } = req.params; // Obtener el ID del producto de los parámetros de la solicitud
  const { user_id } = req.body; // Obtener el ID del usuario de los parámetros de la solicitud

  try {
    const user = await User.findById(user_id); // Buscar al usuario por su ID

    // Verificar si el usuario es un administrador
    if (!user.isAdmin) {
      return res.status(401).json("No tienes permiso para eliminar productos");
    }

    await Product.findByIdAndDelete(id); // Eliminar el producto por su ID
    const products = await Product.find(); // Obtener todos los productos actualizados
    res.status(201).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Obtener un producto por su id y productos similares
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el producto por su id
    const product = await Product.findById(id);

    // Buscar productos similares basados en la misma categoría
    const similar = await Product.find({ category: product.category }).limit(5);

    res.status(200).json({ product, similar });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Obtener productos por categoría
router.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    let products;
    // Si la categoría es "Todos los Productos", se devuelven todos los productos ordenados por fecha
    if (category == "Todos los Productos") {
      products = await Product.find().sort([["date", -1]]);
    } else {
      // Si no, se buscan los productos de la categoría especificada
      products = await Product.find({ category });
    }
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// carrito - Routes
router.post("/add-to-cart", async (req, res) => {
  const { userId, productId, price } = req.body; // Recuperar los datos del usuario, el ID del producto y el precio desde el cuerpo de la solicitud
  try {
    const user = await User.findById(userId); // Buscar al usuario en la DB utilizando el ID del usuario
    const userCart = user.cart; // Obtener el carrito de compras del usuario
    if (user.cart[productId]) {
      // Verificar si el producto ya está en el carrito de compras del usuario
      userCart[productId] += 1; // Si es así, aumentar la cantidad del producto en uno
    } else {
      userCart[productId] = 1; // De lo contrario, agregar el producto al carrito de compras del usuario con una cantidad inicial de 1
    }
    userCart.count += 1; // Actualizar el conteo total de elementos del carrito
    userCart.total = Number(userCart.total) + Number(price); // Actualizar el precio total del carrito en base a la información del producto agregado
    user.cart = userCart; // Asignar el objeto del carrito actualizado al objeto del usuario
    user.markModified("cart"); // Marcar el objeto del carrito como modificado
    await user.save(); // Guardar el objeto del usuario actualizado en la base de datos
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Aumenta la cantidad de un producto existente en el carrito
router.post("/increase-cart", async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total += Number(price);
    userCart.count += 1;
    userCart[productId] += 1;

    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Disminuye la cantidad de un producto existente en el carrito
router.post("/decrease-cart", async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(price);
    userCart.count -= 1;
    userCart[productId] -= 1;

    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Elimina un producto del carrito
router.post("/remove-from-cart", async (req, res) => {
  const { userId, productId, price } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(userCart[productId]) * Number(price);
    userCart.count -= userCart[productId];
    delete userCart[productId];

    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
