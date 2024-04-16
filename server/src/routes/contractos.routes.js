const { Router } = require("express");
const { Contracto, Proyecto, Presupuesto } = require("../db");

const contractoRouter = Router();

contractoRouter.get("/", async (req, res) => {
  try {
    const contractosAll = await Contracto.findAll({
      include: [{ model: Proyecto, include: [Presupuesto] }],
    });

    return res.status(200).json(contractosAll);
  } catch (error) {
    console.log(error);
    return res.status(5000).json(error);
  }
});

module.exports = contractoRouter;
