import { Router } from "express";
import { Contracto, Proyecto, Presupuesto, Usuario } from "../db.js";
import jwtDecode from "jwt-decode";
import { Op, Sequelize } from "sequelize";

const contractoRouter = Router();

contractoRouter.get("/", async (req, res) => {
  const token = req.headers[`access-token`];
  const decoded = jwtDecode(token);
  try {
    const contractosAll = await Contracto.findAll({
      include: [
        {
          model: Proyecto,
          include: [
            {
              model: Presupuesto,
              required: true,
            },
          ],
        },
      ],
      where :{
        '$Proyecto.Presupuesto.UsuarioId$': { [Op.eq]: decoded.id },
      }
    });

    return res.status(200).json(contractosAll);
  } catch (error) {
    console.log(error);
    return res.status(5000).json(error);
  }
});

export default contractoRouter;
