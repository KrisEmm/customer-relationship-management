import React, { useState, useContext } from "react";
import clienteAxios from "../../Config/axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import {CRMContext} from "../../context/CRMContext";

function Login(props) {

  const [credenciales, guardarCredenciales] = useState({});
  const [auth ] = useContext(CRMContext);
  const leerDatos = e => {
    guardarCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value
    });
  };
  if (!auth.auth) {
    props.history.push("/iniciar-sesion");
  }
  const registar = async e => {
    e.preventDefault();
    try {
      if(credenciales.password !== credenciales.confirmarPassword){
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Verifica tu contraseña"
        });
      }
      await clienteAxios.post("/crear-cuenta", {
        email: credenciales.email,
        nombre: credenciales.name,
        password: credenciales.password
      });
      Swal.fire({
        icon: "success",
        title: "Nuevo Usuario",
        text: "Nuevo Usuario Ha Sido Registrado Correctamente"
      });
      props.history.push("/");
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Hubo un Error",
          text: error.response.data.mensaje
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error"
        });
      }
    }
  };
  return (
    <div className="login">
      <h2>Registrar Nuevo Usuario</h2>
      <div className="contenedor-formulario">
        <form onSubmit={registar}>
          <div className="campo">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              placeholder="Ingresa tu Email"
              required
              onChange={leerDatos}
            />
          </div>
          <div className="campo">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Ingresa tu Email"
              required
              onChange={leerDatos}
            />
          </div>
          <div className="campo">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Ingresa tu Contraseña"
              required
              onChange={leerDatos}
            />
          </div>
          <div className="campo">
            <label>Confirmar Password</label>
            <input
              type="password"
              name="confirmarPassword"
              placeholder="Ingresa de Nuevo tu Contraseña"
              required
              onChange={leerDatos}
            />
          </div>
          <input type="submit" value="Registar" className="btn btn-verde btn-block" />
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
