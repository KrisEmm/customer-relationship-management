import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import clienteAxios from "../../Config/axios";
import Producto from "./Producto";
import { CRMContext } from "../../context/CRMContext";
import Swal from "sweetalert2";

function Productos(props) {
  const [auth] = useContext(CRMContext);
  const [actualizar, guardarActualizar] = useState(false)
  const [productos, guardarProductos] = useState([]);

  if (!auth.auth) {
    props.history.push("/iniciar-sesion");
  }

  const consultarApi = async () => {
    try {
      const response = await clienteAxios.get("/productos", {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      guardarProductos(response.data);
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
    guardarActualizar(false)
  }, [actualizar]);


  return (
    <Fragment>
      <h2>Productos</h2>
      <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente">
        Nuevo Producto
      </Link>
      {
        !productos.length
            ? <p>No tienes ningun producto registrado aun</p>
            : <ul className="listado-productos">
              {productos.map(producto => (
                  <Producto key={producto._id} actualizar={guardarActualizar} producto={producto} />
              ))}
            </ul>
      }

    </Fragment>
  );
}

export default withRouter(Productos);
