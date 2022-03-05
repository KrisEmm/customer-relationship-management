import React, { useEffect, useState, useContext, Fragment } from "react";
import clienteAxios from "../../Config/axios";
import { Link, withRouter } from "react-router-dom";
import Cliente from "./Cliente";
import { CRMContext } from "../../context/CRMContext";
import Swal from "sweetalert2";

function Clientes(props) {
  const [auth] = useContext(CRMContext);
  const [actualizar, guardarActualizar] = useState(false)
  const [clientes, guardarClientes] = useState([]);

  if (!auth.auth) {
    props.history.push("/iniciar-sesion");
  }

  const consultarApi = async () => {
    try {
      const response = await clienteAxios.get("/clientes", {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      guardarClientes(response.data.reverse());

    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Intentalo mas tarde"
      });
      props.history.push("/iniciar-sesion");
    }
  };

  useEffect(() => {
    consultarApi();
    guardarActualizar(false);
  }, [actualizar]);


  return (
    <Fragment>
      <h2>Clientes</h2>
      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
        Nuevo Cliente
      </Link>
      {
        !clientes.length
            ? <p>No tienes clientes registrados aun</p>
            : <ul className="listado-clientes">
              {clientes.map(cliente => (
                  <Cliente key={cliente._id} actualizar={guardarActualizar} cliente={cliente} />
              ))}
            </ul>
      }

    </Fragment>
  );
}

export default withRouter(Clientes);
