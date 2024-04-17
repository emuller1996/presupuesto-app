const { Router } = require("express");
const { createFactura } = require("../controllers/facturaController.js");
const { Factura, Contracto, Proyecto } = require("../db.js");

const FacturaRouter = Router();

FacturaRouter.post("/", createFactura);
FacturaRouter.get("/", async (req, res) => {
  try {
    const facturas = await Factura.findAll({
      include: [
        {
          model: Contracto,
          include: Proyecto,
        },
      ],
    });
    return res.status(200).json(facturas);
  } catch (error) {
    console.log(error);
    return;
  }
});

module.exports = FacturaRouter;
