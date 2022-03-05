const Usuarios = require("../Models/Usuarios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registrarUsuario = async (req, res) => {
  const usuario = new Usuarios(req.body);
  usuario.password = await bcrypt.hash(req.body.password, 12);
  try {
    await usuario.save();
    res.json({ mensaje: "Usuario Creado Correctamente" });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "Hubo un error" });
  }
};
exports.autenticarUsuario = async (req, res, next) => {
  const { email, password } = req.body;
  const usuario = await Usuarios.findOne({ email });

  if (!usuario) {
    await res.status(401).json({ mensaje: "Ese usuario no existe" });
  } else {
    if (!bcrypt.compareSync(password, usuario.password)) {
      await res.status(401).json({ mensaje: "La contraseña no es la correcta" });
      next();
    } else {
      const token = jwt.sign(
        {
          email: usuario.email,
          nombre: usuario.nombre,
          id: usuario._id
        },
        "MATIASEMMANUEL",
        {
          expiresIn: "1h"
        }
      );
      res.json({ token });
    }
  }
};
