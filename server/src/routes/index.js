const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const presupuestoRouter = require("./presupuesto.routes.js");
const proyectoRouter = require("./proyecto.routes.js");
const facturaRouter = require("./factura.routes.js");
const contractoRouter = require("./contractos.routes.js");





const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/presupuestos", presupuestoRouter);
router.use("/proyectos", proyectoRouter);
router.use("/facturas", facturaRouter);
router.use("/contractos", contractoRouter);






module.exports = router;