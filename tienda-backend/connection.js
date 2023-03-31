require("dotenv").config();

const mongoose = require("mongoose");

const connectionStr = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.n0xby90.mongodb.net/tienda-online?retryWrites=true&w=majority`;

mongoose
  .connect(connectionStr, { useNewUrlparser: true })
  .then(() => console.log("Conexion MongoDB"))
  .catch((err) => console.log(err));

mongoose.connection.on("error", (err) => {
  console.log(err);
});
