import React, {useContext} from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../Config/axios";
import {CRMContext} from "../../context/CRMContext";

function Producto({ actualizar, producto }) {
  const [auth] = useContext(CRMContext);
  const { _id, nombre, precio, imagen } = producto;

  const eliminarProducto = async (idProducto) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
    if (result.value) {
      try{
        await clienteAxios.delete(`/productos/${idProducto}`,{
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        })
        await Swal.fire({
          icon: "success",
          title: "Deleted!",
        });
        actualizar(true);
      }catch (e) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Intentalo mas tarde"
        });
      }

    }
  };
  return (
    <li className="producto">
      <div className="info-producto">
        <p className="nombre">{nombre}</p>
        <p className="precio">${precio}</p>
        {imagen ? <img src={`http://localhost:3000/${imagen}`} alt="imagen-producto" /> : null}
      </div>
      <div className="acciones">
        <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Producto
        </Link>

        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => eliminarProducto(_id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Producto
        </button>
      </div>
    </li>
  );
}

export default Producto;
