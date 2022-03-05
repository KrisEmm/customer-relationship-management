const express = require("express");
const router = express.Router();
const usuariosController = require("../Controllers/usuariosController");
const clientesController = require("../Controllers/clientesController");
const productosController = require("../Controllers/productosController");
const pedidosController = require("../Controllers/pedidosController");
const autorizado = require("../Middlewares/auth");

module.exports = () => {
  ///----------------Clientes
  //Agregar Nuevo Cliente
  router.post("/clientes", autorizado, clientesController.nuevoCliente);
  //Mostrar Clientes
  router.get("/clientes", autorizado, clientesController.mostrarClientes);
  //Mostar Cliente por ID
  router.get("/clientes/:idCliente", autorizado, clientesController.mostrarCliente);
  //Actualizar Cliente por ID
  router.put("/clientes/:idCliente", autorizado, clientesController.actualizarCliente);
  //Eliminar Cliente por ID
  router.delete("/clientes/:idCliente", autorizado, clientesController.eliminarCliente);

  ///----------------Productos
  //Agregar Nuevo Producto
  router.post(
    "/productos",
    autorizado,
    productosController.subirArchivo,
    productosController.nuevoProducto
  );
  //Mostrar  Productos
  router.get("/productos", autorizado, productosController.mostrarProductos);
  //Mostrar Proucto por ID
  router.get("/productos/:idProducto", autorizado, productosController.mostrarProducto);
  //Mostrar Proucto por ID
  router.put(
    "/productos/:idProducto",
    autorizado,
    productosController.subirArchivo,
    productosController.actualizarProducto
  );
  //Eliminar Producto por ID
  router.delete("/productos/:idProducto", autorizado, productosController.eliminarProducto);
  router.post("/productos/busqueda/:query", autorizado, productosController.buscarProducto);
  ///----------------Pedido
  //Agrega Nuevo Pedido
  router.post("/pedidos/nuevo/:idUsuario", autorizado, pedidosController.nuevoPedido);
  //Mostar pedidos
  router.get("/pedidos", autorizado, pedidosController.mostrarPedidos);
  //Mostar pedidos por ID
  router.get("/pedidos/:idPedido", autorizado, pedidosController.mostrarPedido);
  //Actualizar pedidos por ID
  router.put("/pedidos/:idPedido", autorizado, pedidosController.actualizarPedido);
  //Eliminar pedidos por ID
  router.delete("/pedidos/:idPedido", autorizado, pedidosController.eliminarPedido);

  //--------------- Usuarios
  router.post("/crear-cuenta", usuariosController.registrarUsuario);
  router.post("/iniciar-sesion", usuariosController.autenticarUsuario);
  return router;
};
