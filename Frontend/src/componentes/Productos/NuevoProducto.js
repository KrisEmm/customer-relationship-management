import React, {Fragment, useContext, useState} from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../Config/axios";
import { withRouter } from "react-router-dom";
import {CRMContext} from "../../context/CRMContext";

function NuevoProducto(props) {
  const [auth] = useContext(CRMContext);
  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: ""
  });
  const [archivo, guardarArchivo] = useState("");

  const leerInfoProducto = e => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  const leerInfoArchivo = e => {
    guardarArchivo(e.target.files[0]);
  };

  const agregarProducto = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("imagen", archivo);

    try {
      await clienteAxios.post("/productos", formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      await Swal.fire("Saved Success!", "Product Added Success", "success");
      props.history.push("/productos");
    } catch (e) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Intentalo mas tarde"
      });
    }
  };
  return (
    <Fragment>
      <h2>Nuevo Producto</h2>

      <form onSubmit={agregarProducto}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={leerInfoProducto}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            min="0.00"
            step="0.01"
            placeholder="Precio"
            onChange={leerInfoProducto}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          <input type="file" name="imagen" onChange={leerInfoArchivo} />
        </div>

        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="Agregar Producto" />
        </div>
      </form>
    </Fragment>
  );
}

export default withRouter(NuevoProducto);
