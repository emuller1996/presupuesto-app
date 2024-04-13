import React from "react";

const PresupuestosPages = React.lazy(() =>
  import("./pages/Presupuestos/PresupuestosPages")
);
const ProyectosPages = React.lazy(() => import("./pages/Proyectos/index"));
const PresupuestoDetalle = React.lazy(() =>
  import("./pages/PresupuestoDetalle/index")
);


const routes = [
  { path: "/presupuestos", name: "", element: PresupuestosPages },
  { path: "/presupuesto/:idPresupuesto", name: "", element: PresupuestoDetalle },
  { path: "/proyectos", name: "", element: ProyectosPages },

];

export default routes;
