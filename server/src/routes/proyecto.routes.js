import { Router } from "express";
import { getProyectoById, updateProyectoById, getContractosByProyecto, createContractoProyecto, getFacturasByProyecto, getAllProyectos } from "../controllers/proyectoController.js";

const proyectoRouter = Router();

proyectoRouter.get("/", getAllProyectos);

proyectoRouter.get("/:id", getProyectoById);
proyectoRouter.get("/:id/contractos", getContractosByProyecto);
proyectoRouter.get("/:id/facturas", getFacturasByProyecto);

proyectoRouter.post("/:id/contractos", createContractoProyecto);

proyectoRouter.patch("/:id", updateProyectoById);

export default proyectoRouter;
