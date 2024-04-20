const { Router } = require("express");
const { createFactura } = require("../controllers/facturaController.js");
const { Factura, Contracto, Proyecto } = require("../db.js");
const { Sequelize, Op } = require("sequelize");

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
FacturaRouter.get("/last-15-days", async (req, res) => {
  const fechasUltimos15Dias = [];

  // Generar las fechas de los últimos 15 días y agregarlas al array
  for (let i = 0; i < 15; i++) {
    fechasUltimos15Dias.push(getFechaAtras(i));
  }

  const arrP = fechasUltimos15Dias.map(async (p) => {
    const fechaEspecifica = new Date(p);

    // Obtener la fecha de inicio del día
    const fechaInicioDia =fechaEspecifica.toISOString().substring(0,10)+"T00:00:00.000Z";
    // Obtener la fecha de fin del día

    const fechaFinDia =fechaEspecifica.toISOString().substring(0,10)+"T23:59:59.999Z";

    /* const fechaFinDia = new Date(fechaEspecifica);
    fechaFinDia.setHours(23 , 59, 59, 999); */
    console.log(fechaInicioDia, fechaFinDia);

    result = await Factura.findOne({
      attributes: [
        [Sequelize.fn("DATE", Sequelize.col("fechaPagado")), "time"], // Obtener solo la fecha (sin la hora)
        [Sequelize.fn("SUM", Sequelize.col("montoTotal")), "value"], // Obtener la suma del monto de los pagos
      ],

      where: {
        fechaPagado: {
          [Sequelize.Op.gte]: fechaInicioDia,
          [Sequelize.Op.lt]: fechaFinDia,
        },
      },
    });
    if (result.dataValues.time === null) {
      return {
        time: fechaEspecifica.toISOString().substring(0,10),
        value: 0,
        dataValues: { time: fechaEspecifica },
      };
    }
    return result;
  });

  const data = await Promise.all(arrP);
  return res
    .status(200)
    .json(data.filter((i) => i.dataValues.time !== null).reverse());

  const fechaEspecifica = new Date("2024-04-16");

  // Obtener la fecha de inicio del día
  const fechaInicioDia = new Date(fechaEspecifica);
  fechaInicioDia.setHours(0, 0, 0, 0);

  // Obtener la fecha de fin del día
  const fechaFinDia = new Date(fechaEspecifica);
  fechaFinDia.setHours(23, 59, 59, 999);

  // Realizar la consulta para obtener el total de pagos de los últimos 15 días
  /* Factura.findAll({
    attributes: [
      [Sequelize.fn("DATE", Sequelize.col("fechaPagado")), "fechaPagado"], // Obtener solo la fecha (sin la hora)
      [Sequelize.fn("SUM", Sequelize.col("montoTotal")), "total"], // Obtener la suma del monto de los pagos
    ],

    where: {
      fechaPagado: {
        [Sequelize.Op.gte]: fechaInicioDia,
        [Sequelize.Op.lt]: fechaFinDia,
      },
    },
  })
    .then((resultados) => {

      console.log(resultados);
      return res.status(200).json(resultados);
    })
    .catch((error) => {
      console.error("Error al realizar la consulta:", error);
    }); */
});
function getFechaAtras(n) {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() - n);
  return fecha;
}

module.exports = FacturaRouter;
