require("dotenv").config();

const mongoose = require("mongoose");

const CONNECTION_MONGODB = process.env.CONNECTION_MONGODB;

mongoose
  .connect(CONNECTION_MONGODB, { useNewUrlparser: true })
  .then(() => console.log("Conexion MongoDB"))
  .catch((err) => console.log(err));

mongoose.connection.on("error", (err) => {
  console.log(err);
});

//TEST
