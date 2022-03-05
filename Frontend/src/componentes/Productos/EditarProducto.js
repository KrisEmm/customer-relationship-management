import React, {useState, useEffect, Fragment, useContext} from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../Config/axios";
import { withRouter } from "react-router-dom";
import {CRMContext} from "../../context/CRMContext";

function EditarProducto(props) {
  const [auth] = useContext(CRMContext);
  const { id } = props.match.params;
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

  const consultarApi = async () => {
    const productosConsulta = await clienteAxios.get(`/productos/${id}`,{
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });
    guardarProducto(productosConsulta.data);
  };

  useEffect(() => {
    consultarApi();
  }, []);

  const editarProducto = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("imagen", archivo);

    try {
      await clienteAxios.put(`/productos/${producto._id}`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      await  Swal.fire("Update Success!", "Updated Success", "success");
      props.history.push("/productos");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Intentalo mas tarde"
      });
    }
  };
  return (
    <Fragment>
      <h2>Editar Producto</h2>
      <form onSubmit={editarProducto}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={leerInfoProducto}
            defaultValue={producto.nombre}
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
            defaultValue={producto.precio}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          <input type="file" name="imagen" onChange={leerInfoArchivo} />
          {producto.imagen ? (
            <img src={`http://localhost:3000/${producto.imagen}`} alt="imagen-producto" />
          ) : null}
        </div>

        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="Guardar Cambios" />
        </div>
      </form>
    </Fragment>
  );
}

export default withRouter(EditarProducto);
