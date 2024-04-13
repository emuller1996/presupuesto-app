import React from "react";

const PresupuestosPages = React.lazy(() =>
  import("./pages/Presupuestos/PresupuestosPages")
);
const ProyectosPages = React.lazy(() => import("./pages/Proyectos/index"));

const routes = [
  { path: "/presupuestos", name: "", element: PresupuestosPages },
  { path: "/proyectos", name: "", element: ProyectosPages },

];

export default routes;
