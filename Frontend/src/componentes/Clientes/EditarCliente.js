import React, {Fragment, useState, useEffect, useContext} from "react";
import { withRouter } from "react-router-dom";
import clienteAxios from "../../Config/axios";
import Swal from "sweetalert2";
import {CRMContext} from "../../context/CRMContext";

function EditarCliente(props) {

  const [auth] = useContext(CRMContext);

  const { id } = props.match.params;

  const [cliente, guardarCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: ""
  });

  const actualizarState = e => {
    guardarCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });
  };

  const validarCliente = () => {
    const { nombre, apellido, email, empresa, telefono } = cliente;
    let valido =
      !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;
    return valido;
  };

  const consultarApi = async () => {
    const response = await clienteAxios.get(`/clientes/${id}`,{
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });
    guardarCliente(response.data);

  };

  useEffect((id) => {
    consultarApi();
  }, []);

  const actualizarCliente = async (e) => {
    e.preventDefault();
    try{
      await clienteAxios.put(`/clientes/${cliente._id}`, cliente,{
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      await Swal.fire("Good job!", "Update success!", "success");
    }catch (e) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Intentalo mas tarde"
      });
    }
    props.history.push("/");
  };

  return (
    <Fragment>
      <h2>Editar Cliente</h2>
      <form onSubmit={actualizarCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={actualizarState}
            defaultValue={cliente.nombre}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={actualizarState}
            defaultValue={cliente.apellido}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={actualizarState}
            defaultValue={cliente.empresa}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={actualizarState}
            defaultValue={cliente.email}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={actualizarState}
            defaultValue={cliente.telefono}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar Cambios"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
}

export default withRouter(EditarCliente);
