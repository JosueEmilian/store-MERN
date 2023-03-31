const cloudinary = require("cloudinary");
const router = require("express").Router();
require("dotenv").config();

/**
 * Se configura la conexión con la API de Cloudinary utilizando las
   credenciales de acceso correspondientes
 */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//Endpoint para eliminar una imagen de Cloudinary a través de su ID pública
router.delete("/:public_id", async (req, res) => {
  const { public_id } = req.params;

  try {
    /**
     *Se utiliza el método 'uploader.destroy' de Cloudinary para eliminar 
      la imagen correspondiente a la ID pública proporcionada
     */
    await cloudinary.uploader.destroy(public_id);
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
