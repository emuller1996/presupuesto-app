import React from "react";

const Dasboard = React.lazy(() =>
  import("./pages/Dashboard/Dashboard")
);
const PresupuestosPages = React.lazy(() =>
  import("./pages/Presupuestos/PresupuestosPages")
);
const ContractosPages = React.lazy(() =>
  import("./pages/Contractos/ContractosPages")
);
const FacturasPages = React.lazy(() =>
  import("./pages/Facturas/FacturasPages")
);
const ProyectosPages = React.lazy(() => import("./pages/Proyectos/index"));

const FacturasProyectoPage = React.lazy(() =>
  import("./pages/ProyectoDetalle/FacturasProyectoPage/FacturasProyectoPage")
);

const ProyectoDetalle = React.lazy(() =>
  import("./pages/ProyectoDetalle/ProyectoDetallePages")
);

const PresupuestoDetalle = React.lazy(() =>
  import("./pages/PresupuestoDetalle/index")
);

const routes = [
  { path: "/", name: "Dasboard", element: Dasboard },

  { path: "/presupuestos", name: "presupuestos", element: PresupuestosPages },
  {
    path: "/presupuestos/:idPresupuesto",
    name: "Presupuesto",
    element: PresupuestoDetalle,
  },
  { path: "/proyectos", name: "proyectos", element: ProyectosPages },
  { path: "/proyectos/:idProyectos", name: "proyectos Detalle", element: ProyectoDetalle },
  {
    path: "/proyectos/:idProyectos/facturas",
    name: "Facturas",
    element: FacturasProyectoPage,
  },

  { path: "/contractos/", name: "Contractos", element: ContractosPages },
  { path: "/facturas/", name: "Facturas", element: FacturasPages },

];

export default routes;
