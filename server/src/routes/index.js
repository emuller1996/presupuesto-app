const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const presupuestoRouter = require("./presupuesto.routes.js");
const proyectoRouter = require("./proyecto.routes.js");




const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/presupuestos", presupuestoRouter);
router.use("/proyectos", proyectoRouter);




module.exports = router;