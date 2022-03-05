const Productos = require("../Models/Productos");
const multer = require("multer");
const shortid = require("shortid");
const fs = require("fs");

const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    }
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato No válido"));
    }
  }
};

const upload = multer(configuracionMulter).single("imagen");

exports.subirArchivo = (req, res, next) => {
  upload(req, res, function(error) {
    if (error) {
      res.json({ mensaje: error });
    }
    return next();
  });
};

exports.nuevoProducto = async (req, res, next) => {
  const producto = new Productos(req.body);

  try {
    if (req.file.filename) {
      producto.imagen = req.file.filename;
    }
    await producto.save();
    res.json({ mensaje: "Un nuevo producto se ha agregado" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.mostrarProductos = async (req, res, next) => {
  try {
    const productos = await Productos.find({});
    res.json(productos);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.mostrarProducto = async (req, res, next) => {
  try {
    const producto = await Productos.findById(req.params.idProducto);
    if (!producto) {
      res.json({ mensaje: "Ese Producto NO Existe" });
      return next();
    }
    res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.actualizarProducto = async (req, res, next) => {
  try {
    const nuevoProducto = req.body;
    console.log(nuevoProducto);
    if (req.file) {
      nuevoProducto.imagen = req.file.filename;
    } else {
      const producto = await Productos.findById(req.params.idProducto);
      nuevoProducto.imagen = producto.imagen;
    }

    const producto = await Productos.findOneAndUpdate(
      { _id: req.params.idProducto },
      nuevoProducto,
      {
        new: true
      }
    );
    res.json({ mensaje: "Producto Actualizado" });
  } catch (error) {
    console, log(error);
    next();
  }
};

exports.eliminarProducto = async (req, res, next) => {
  try {
    const producto = await Productos.findById(req.params.idProducto);
    if (producto) {
      const path = __dirname + `/../uploads/${producto.imagen}`;
      fs.unlinkSync(path);
    }
    await Productos.findByIdAndDelete({ _id: req.params.idProducto });
    res.json({ mensaje: "Producto Eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.buscarProducto = async (req, res, next) => {
  try {
    const { query } = req.params;
    const producto = await Productos.find({ nombre: new RegExp(query, "i") });
    res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};
