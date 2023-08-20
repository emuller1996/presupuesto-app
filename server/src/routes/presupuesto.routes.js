const { Router } = require("express");
const {
    getTodosPresupuesto,
    createPresupuesto,
    getPresupuestoById
} = require("../controllers/presupuestoController.js");

const presupuestoRouter = Router();

presupuestoRouter.get("/", getTodosPresupuesto);
presupuestoRouter.get("/:id", getPresupuestoById);
presupuestoRouter.post("/", createPresupuesto);




module.exports = presupuestoRouter;