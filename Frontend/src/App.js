import React, { Fragment, useContext } from "react";
import { CRMContext, CRMProvider } from "./context/CRMContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./componentes/layout/Header";
import Navegacion from "./componentes/layout/Navegacion";
import Clientes from "./componentes/Clientes/Clientes";
import NuevoCliente from "./componentes/Clientes/NuevoCliente";
import EditarCliente from "./componentes/Clientes/EditarCliente";
import Productos from "./componentes/Productos/Productos";
import EditarProducto from "./componentes/Productos/EditarProducto";
import NuevoProducto from "./componentes/Productos/NuevoProducto";
import Pedidos from "./componentes/Pedidos/Pedidos";
import NuevoPedido from "./componentes/Pedidos/NuevoPedido";
import Login from "./componentes/Autenticacion/Login";
import Registrar from "./componentes/Usuarios/Registrar";

function App() {
  const [auth, guardarAuth] = useContext(CRMContext);
  return (
    <Router>
      <Fragment>
        <CRMProvider value={[auth, guardarAuth]}>
          <Header />;
          <div className="grid contenedor contenido-principal">
            <Navegacion />
            <main className="caja-contenido col-9">
              <Switch>
                <Route exact path="/" component={Clientes} />
                <Route exact path="/clientes/nuevo" component={NuevoCliente} />
                <Route exact path="/clientes/editar/:id" component={EditarCliente} />
                <Route exact path="/productos" component={Productos} />
                <Route exact path="/productos/nuevo" component={NuevoProducto} />
                <Route exact path="/productos/editar/:id" component={EditarProducto} />
                <Route exact path="/pedidos" component={Pedidos} />
                <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />
                <Route exact path="/iniciar-sesion" component={Login} />
                <Route exact path="/registrar" component={Registrar} />
              </Switch>
            </main>
          </div>
        </CRMProvider>
      </Fragment>
    </Router>
  );
}

export default App;
