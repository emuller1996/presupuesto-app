const { Router } = require("express");
const {
    getTodosPresupuesto,
    createPresupuesto,
    getPresupuestoById,
    createProyectoByPresupuesto,
    getProyectoByPresupuesto
} = require("../controllers/presupuestoController.js");

const presupuestoRouter = Router();

presupuestoRouter.get("/", getTodosPresupuesto);
presupuestoRouter.get("/:id", getPresupuestoById);
presupuestoRouter.get("/:id/proyectos", getProyectoByPresupuesto);

presupuestoRouter.post("/", createPresupuesto);
presupuestoRouter.post("/:id/proyectos", createProyectoByPresupuesto);






module.exports = presupuestoRouter;