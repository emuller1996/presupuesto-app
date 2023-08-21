import React from "react";

const PresupuestoComponent = React.lazy(() =>
  import("./views/Presupuesto/Presupuesto")
);
const ProyectosComponent = React.lazy(() =>
  import("./views/Proyectos/Proyectos.jsx")
);
const FacturasComponent = React.lazy(() =>
  import("./views/Facturas/Facturas.jsx")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/presupuesto", name: "Dashboard", element: PresupuestoComponent },
  { path: "/proyecto/:id", name: "ProyectDetail", element: ProyectosComponent },
  { path: "/proyecto/:id/facturas", name: "Facturas", element: FacturasComponent },
];

export default routes;
