const { Router } = require("express");
const {
    createFactura
} = require("../controllers/facturaController.js");

const FacturaRouter = Router();

FacturaRouter.post("/", createFactura);






module.exports = FacturaRouter;