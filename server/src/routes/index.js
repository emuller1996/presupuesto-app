import { Router } from "express";

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
import presupuestoRouter from "./presupuesto.routes.js";
import proyectoRouter from "./proyecto.routes.js";
import facturaRouter from "./factura.routes.js";
import contractoRouter from "./contractos.routes.js";
import authRouters from "./auth.routes.js";
import { validateToken } from "../utils/authjws.js";

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/presupuestos", validateToken, presupuestoRouter);
router.use("/proyectos", validateToken, proyectoRouter);
router.use("/facturas", validateToken, facturaRouter);
router.use("/contractos", validateToken, contractoRouter);
router.use("/auth", authRouters);

export default router;
