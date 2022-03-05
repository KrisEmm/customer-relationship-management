const express = require("express");
const router = require("./Routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const bcrypt = require("bcrypt");
const Usuarios = require("./Models/Usuarios");

mongoose.Promise = global.Promise;
mongoose
  .connect(`mongodb://database:27017/crm`, {
      useNewUrlParser: true,
      useCreateIndex: true
  })
  .then(respuesta => {
    const name = respuesta.connections[0].name;
    const puerto = respuesta.connections[0].port;
    console.log(`db ${name} is running on ${puerto}`);
  });
mongoose.connection.on("connected", async ()=>{
  try {
    const usuario = new Usuarios({
      email: 'admin@crm.com',
      nombre: "Administrador",
      password: "admin"
    });
    usuario.password = await bcrypt.hash('admin', 12);
    const result = await Usuarios.findOne({ email: usuario.email });
    if(!result){
      await usuario.save()
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})
const app = express();
const whitelist = ["http://localhost:8080/"];
const corsOptionsDelegate = function (req, callback) {
  const corsOptions  = { origin: true };
  const esValido = whitelist.some( dominio => req.headers.origin === dominio || req.headers.referer === dominio );
  if (esValido) {
    callback(null, corsOptions)
  } else {
    callback(new Error("No permitido por CORS"));
  }
}
app.use(morgan("dev"));
app.use(cors(corsOptionsDelegate));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use("/", router());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
