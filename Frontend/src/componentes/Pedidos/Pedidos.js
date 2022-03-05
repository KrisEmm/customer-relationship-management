import React, { useEffect, useState, useContext, Fragment } from "react";
import clienteAxios from "../../Config/axios";
import DetallesPedido from "./DetallesPedido";
import { CRMContext } from "../../context/CRMContext";
import { withRouter } from "react-router-dom";

function Pedidos(props) {
  const [auth] = useContext(CRMContext);
  const [actualizar, guardarActualizar] = useState(false);
  const [pedidos, guardarPedidos] = useState([]);

  if (!auth.auth) {
    props.history.push("/iniciar-sesion");
  }

  const consultarApi = async () => {
    try {
      const response = await clienteAxios.get("/pedidos", {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      guardarPedidos(response.data);
    } catch (error) {
        props.history.push("/iniciar-sesion");
    }
  };

  useEffect(() => {
    consultarApi();
    guardarActualizar(false);
  }, [actualizar]);


  return (
    <Fragment>
      <h2>Pedidos</h2>
      {
        !pedidos.length
            ? <p>No tienes ningun pedido aun</p>
            :  <ul className="listado-pedidos">
              {pedidos.map(pedido => (
                  <DetallesPedido key={pedido._id} actualizar={guardarActualizar} pedido={pedido} />
              ))}
            </ul>
      }

    </Fragment>
  );
}

export default withRouter(Pedidos);
