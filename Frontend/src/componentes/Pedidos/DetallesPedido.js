import React, {useContext} from "react";
import PartidasPedido from "./PartidasPedido";
import clienteAxios from "../../Config/axios";
import Swal from "sweetalert2";
import {CRMContext} from "../../context/CRMContext";

function DetallesPedido({ actualizar, pedido }) {
  const [auth] = useContext(CRMContext);

  const partidas = pedido.pedido;

  const eliminarPedido = async (idPedido) => {
   try{
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
       await clienteAxios.delete(`/pedidos/${idPedido}`, {
         headers: {
           Authorization: `Bearer ${auth.token}`
         }
       })
       await Swal.fire("Deleted!", "Order Deleted Success", "success");
       actualizar(true)
     }
   }catch (e) {
     await Swal.fire({
       icon: "error",
       title: "Error",
       text: "Intentalo mas tarde"
     });
   }
  };

  return (
    <li className="pedido">
      <div className="info-pedido">
        <p className="id">ID Pedido: {pedido._id} </p>
        <p className="id">Empresa: {pedido.cliente.empresa} </p>
        <p className="nombre">
          Cliente: {pedido.cliente.nombre} {pedido.cliente.apellido}
        </p>

        <div className="articulos-pedido">
          <p className="productos">Artículos Pedido: </p>
          <ul>
            {partidas.map(partida => (
              <PartidasPedido key={partida._id} partida={partida} />
            ))}
          </ul>
        </div>
        <p className="total">Total: $ {pedido.total} USD</p>
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => eliminarPedido(pedido._id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Pedido
        </button>
      </div>
    </li>
  );
}

export default DetallesPedido;
