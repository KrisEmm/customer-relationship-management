import React, { Fragment, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import clienteAxios from "../../Config/axios";
import Swal from "sweetalert2";
import { CRMContext } from "../../context/CRMContext";

function NuevoCliente({ history }) {

  const [auth] = useContext(CRMContext);
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

  const agregarCliente = async (e) => {
    e.preventDefault();
    try{
      await clienteAxios.post("/clientes", cliente,{
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      await Swal.fire("Good job!", "Registred!", "success");
    }catch (e) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Intentalo mas tarde"
      });
    }
    history.push("/");
  };
  if (!auth.auth) {
    history.push("/iniciar-sesion");
  }
  return (
    <Fragment>
      <h2>Nuevo Cliente</h2>
      <form onSubmit={agregarCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState} />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={actualizarState}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Fragment>
  );
}

export default withRouter(NuevoCliente);
