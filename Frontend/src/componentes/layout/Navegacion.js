import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

const Navegacion = () => {
  const [auth] = useContext(CRMContext);
  if (!auth.auth) return null;
  return (
    <aside className="sidebar col-3">
      <h2>Administración</h2>

      <nav className="navegacion">
        <Link to={"/"}>
          <i className="icono fas fa-users-cog fa-2x"></i>
          Clientes
        </Link>
        <Link to={"/productos"}>
          <i className="icono fas fa-store-alt fa-2x"></i>
          Productos
        </Link>
        <Link to={"/pedidos"}>
          <i className="icono fas fa-cart-plus fa-2x"></i>
          Pedidos
        </Link>
      </nav>
    </aside>
  );
};
export default Navegacion;
