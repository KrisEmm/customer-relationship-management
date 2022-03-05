import React, {useEffect, useState, Fragment, useContext} from "react";
import clienteAxios from "../../Config/axios";
import FormBuscarProducto from "./FormBuscarProducto";
import FormCantidadProducto from "./FormCantidadProducto";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import {CRMContext} from "../../context/CRMContext";

function NuevoPedido(props) {
  const { id } = props.match.params;
  const [auth] = useContext(CRMContext);

  const [cliente, guardarCliente] = useState({});
  const [busqueda, guardarBusqueda] = useState("");
  const [productos, guardarProductos] = useState([]);
  const [total, guardarTotal] = useState(0);

  const consultarApi = async () => {
    const response = await clienteAxios.get(`/clientes/${id}`,{
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });
    guardarCliente(response.data);
  };

  useEffect(() => {
    consultarApi();
    actualizarTotal();
  }, [productos]);

  const buscarProducto = async e => {
    e.preventDefault();
    const productosBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`,{},
        {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });
    if (productosBusqueda.data[0]) {
      let productoResultado = productosBusqueda.data[0];
      productoResultado.producto = productosBusqueda.data[0]._id;
      productoResultado.cantidad = 0;
      const productosfiltrados=  productos.filter((producto)=>producto.producto !== productoResultado.producto)
      guardarProductos([...productosfiltrados, productoResultado]);
    } else {
      Swal.fire({
        icon: "error",
        title: "No Resultados",
        text: "No hay Resultados"
      });
    }
  };
  const leerDatosBusqueda = e => {
    guardarBusqueda(e.target.value);
  };

  const disminuirProducto = i => {
    const todosProductos = [...productos];
    if (todosProductos[i].cantidad === 0) return;
    todosProductos[i].cantidad--;
    guardarProductos(todosProductos);
  };
  const aumentarProducto = i => {
    const todosProductos = [...productos];
    todosProductos[i].cantidad++;
    guardarProductos(todosProductos);
  };
  const actualizarTotal = () => {
    if (productos.length === 0) {
      guardarTotal(0);
      return;
    }

    let nuevoTotal = 0;

    productos.map(producto => {
      nuevoTotal += producto.cantidad * producto.precio;
    });
    guardarTotal(nuevoTotal);
  };

  const eliminarProductoPedido = id => {
    const todosProductos = productos.filter(producto => producto.producto !== id);
    guardarProductos(todosProductos);
  };

  const realizarPedido = async e => {
    e.preventDefault();
    const pedido = {
      cliente: id,
      pedido: productos,
      total: total
    };
    const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido,{
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });
    if (resultado.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Pedido Realizado Correctamente",
        text: resultado.data.mensaje
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Vuelva a intentarlo"
      });
    }
    props.history.push("/pedidos");
  };
  return (
    <Fragment>
      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>
          <span>
            <strong>Nombre:</strong>
          </span>{" "}
          {cliente.nombre} {cliente.apellido}
        </p>
        <p>
          <span>
            <strong>Empresa:</strong>
          </span>{" "}
          {cliente.empresa}
        </p>
        <p>
          <span>
            <strong>Email:</strong>
          </span>{" "}
          {cliente.email}
        </p>
        <p>
          <span>
            <strong>Telefono:</strong>
          </span>{" "}
          {cliente.telefono}
        </p>
      </div>

      <FormBuscarProducto buscarProducto={buscarProducto} leerDatosBusqueda={leerDatosBusqueda} />

      <ul className="resumen">
        {productos.map((producto, index) => (
          <FormCantidadProducto
            key={producto.producto}
            producto={producto}
            disminuirProducto={disminuirProducto}
            aumentarProducto={aumentarProducto}
            eliminarProductoPedido={eliminarProductoPedido}
            index={index}
          />
        ))}
      </ul>
      <p className="total">
        Total a Pagar:<span> {total} </span>
      </p>
      {total > 0 ? (
        <form onSubmit={realizarPedido}>
          <input type="submit" className="btn btn-verde btn-block" value="Realizar Pedido" />
        </form>
      ) : null}
    </Fragment>
  );
}

export default withRouter(NuevoPedido);
