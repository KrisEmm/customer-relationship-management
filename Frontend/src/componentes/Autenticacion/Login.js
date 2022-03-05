import React, { useState, useContext } from "react";
import clienteAxios from "../../Config/axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

function Login(props) {

  const [auth, guardarAuth] = useContext(CRMContext);

  const [credenciales, guardarCredenciales] = useState({});

  const leerDatos = e => {
    guardarCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value
    });
  };

  const iniciarSesion = async( e )=> {
    e.preventDefault();

    try {

      const respuesta = await clienteAxios.post("/iniciar-sesion", credenciales);
      const { token } = respuesta.data;

      localStorage.setItem("token", token);

      guardarAuth({ token, auth: true });

      await Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: "Haz Iniciado Sesión Correctamente"
      });

      props.history.push("/");

    } catch (error) {

      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Revisa tu email o contraseña"
      });

    }
  };

  return (
    <div className="login">
      <h2>Iniciar Sesión</h2>
      <div className="contenedor-formulario">
        <form onSubmit={iniciarSesion}>
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
          <input type="submit" value="Iniciar Sesión" className="btn btn-verde btn-block" />
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
