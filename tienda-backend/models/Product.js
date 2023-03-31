const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },

    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
    },

    price: {
      type: String,
      required: [true, "El precio es obligatorio"],
    },

    category: {
      type: String,
      required: [true, "La categoría es obligatoria"],
    },

    pictures: {
      type: Array,
      required: [true, "La imagen es obligatoria"],
    },
  },
  { minimize: false }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
