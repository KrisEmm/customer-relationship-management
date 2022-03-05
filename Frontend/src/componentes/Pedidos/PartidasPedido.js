import React from "react";

function PartidasPedido(props) {
  const { producto, cantidad } = props.partida;
  return (
    <li>
      <p>
        <strong>Producto:</strong>
        {producto.nombre}
      </p>
      <p>
        <strong>Precio:</strong> $ {producto.precio} USD.
      </p>
      <p>
        <strong>Cantidad:</strong> {cantidad}
      </p>
    </li>
  );
}

export default PartidasPedido;
