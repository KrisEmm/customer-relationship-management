import React, {useContext} from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../Config/axios";
import {CRMContext} from "../../context/CRMContext";

function Cliente({ actualizar, cliente }) {

  const [auth] = useContext(CRMContext);

  const { _id, nombre, apellido, empresa, email, telefono } = cliente;

  const eliminarCliente = async (idCliente) => {

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.value) {
      try {

        await clienteAxios.delete(`/clientes/${idCliente}`,{
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        })

        await Swal.fire({
          icon: "success",
          title: "Deleted!",
        });
        actualizar(true);
      } catch (e) {

        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Intentalo mas tarde"
        });

      }
    }

  };
  return (
    <li className="cliente">
      <div className="info-cliente">
        <p className="nombre">
          {nombre} {apellido}
        </p>
        <p className="empresa"> {empresa} </p>
        <p> {email} </p>
        <p>Tel: {telefono} </p>
      </div>
      <div className="acciones">
        <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Cliente
        </Link>
        <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
          <i className="fas fa-plus"></i>
          Nuevo Pedido
        </Link>
        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => eliminarCliente(_id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  );
}
export default Cliente;
