const { Router } = require("express");
const {
  getProyectoById,
  updateProyectoById,
  getContractosByProyecto,
  createContractoProyecto,
  getFacturasByProyecto,
  getAllProyectos,
} = require("../controllers/proyectoController.js");

const proyectoRouter = Router();

proyectoRouter.get("/", getAllProyectos);

proyectoRouter.get("/:id", getProyectoById);
proyectoRouter.get("/:id/contractos", getContractosByProyecto);
proyectoRouter.get("/:id/facturas", getFacturasByProyecto);

proyectoRouter.post("/:id/contractos", createContractoProyecto);

proyectoRouter.patch("/:id", updateProyectoById);

module.exports = proyectoRouter;
