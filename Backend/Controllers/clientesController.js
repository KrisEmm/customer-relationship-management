const Clientes = require("../Models/Clientes");

exports.nuevoCliente = async (req, res, next) => {
  const cliente = new Clientes(req.body);

  try {
    await cliente.save();
    res.json({ mensaje: "Se ha agregado un nuevo cliente" });
  } catch (error) {
    res.send(error);
    next();
  }
};

exports.mostrarClientes = async (req, res, next) => {
  try {
    const clientes = await Clientes.find({});
    res.json(clientes);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.mostrarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findById(req.params.idCliente);
    if (!cliente) {
      res.json({ mensaje: "El cliente no existe" });
      next();
    }
    res.json(cliente);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.actualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findOneAndUpdate({ _id: req.params.idCliente }, req.body, {
      new: true
    });
    res.json(cliente);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.eliminarCliente = async (req, res, next) => {
  try {
    await Clientes.findOneAndDelete({ _id: req.params.idCliente });
    res.json({ mensaje: "El cliente se ha eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};
