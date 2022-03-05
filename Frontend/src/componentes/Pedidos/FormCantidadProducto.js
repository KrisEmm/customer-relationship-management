import React from "react";
function FormCantidadProducto(props) {
  const { producto, disminuirProducto, aumentarProducto, index, eliminarProductoPedido } = props;
  // console.log(props);
  return (
    <li>
      <div className="texto-producto">
        <p className="nombre"> {producto.nombre} </p>
        <p className="precio"> ${producto.precio} </p>
      </div>
      <div className="acciones">
        <div className="contenedor-cantidad">
          <span className="ctr" onClick={() => disminuirProducto(index)}>
            <i className="fas fa-minus fa-lg"></i>
          </span>
          <p> {producto.cantidad} </p>
          <span className="ctr" onClick={() => aumentarProducto(index)}>
            <i className="fas fa-plus fa-lg"></i>
          </span>
        </div>
        <button
          type="button"
          className="btn btn-rojo"
          onClick={() => eliminarProductoPedido(producto.producto)}
        >
          <i className="fas fa-minus-circle"></i>
          Eliminar Producto
        </button>
      </div>
    </li>
  );
}

export default FormCantidadProducto;
