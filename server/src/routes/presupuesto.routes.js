const { Router } = require("express");
const {
  getTodosPresupuesto,
  createPresupuesto,
  getPresupuestoById,
  createProyectoByPresupuesto,
  getProyectoByPresupuesto,
} = require("../controllers/presupuestoController.js");
const { Presupuesto } = require("../db.js");

const presupuestoRouter = Router();

presupuestoRouter.get("/", getTodosPresupuesto);
presupuestoRouter.get("/:id", getPresupuestoById);
presupuestoRouter.get("/:id/proyectos", getProyectoByPresupuesto);

presupuestoRouter.post("/", createPresupuesto);
presupuestoRouter.post("/:id/proyectos", createProyectoByPresupuesto);

presupuestoRouter.patch("/:id", async (req, res) => {
  try {
    const data = req.body;
    const presu = await Presupuesto.findByPk(req.params.id);

    presu.totalCantidad = data.totalCantidad;
    presu.descripcion = data.descripcion;

    var Restantenuevo = data.totalCantidad - presu.totalAsignado;
    if (Restantenuevo < 0) {
      return res.status(405).json({ message: "ERROR NO SE PUEDE" });
    }
    presu.totalRestante = data.totalCantidad - presu.totalAsignado;
    await presu.save();

    return res
      .status(202)
      .json({ message: "SE ACTUALIZO EL PRESUPUESTO", Presupuesto: presu });
  } catch (error) {
    console.log(error);
  }
});

module.exports = presupuestoRouter;
