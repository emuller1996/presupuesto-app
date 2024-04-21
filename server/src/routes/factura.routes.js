import { Router } from "express";
import { createFactura } from "../controllers/facturaController.js";
import { Factura, Contracto, Proyecto, Presupuesto } from "../db.js";
import { Sequelize, Op } from "sequelize";
import jwtDecode from "jwt-decode";

const FacturaRouter = Router();

FacturaRouter.post("/", createFactura);
FacturaRouter.get("/", async (req, res) => {
  const token = req.headers[`access-token`];
  const decoded = jwtDecode(token);
  try {
    const facturas = await Factura.findAll({
      include: [
        {
          model: Contracto,
          include: { model: Proyecto, include: Presupuesto },
        },
      ],
      where: {
        "$Contracto.Proyecto.Presupuesto.UsuarioId$": { [Op.eq]: decoded.id },
      },
    });
    return res.status(200).json(facturas);
  } catch (error) {
    console.log(error);
    return;
  }
});
FacturaRouter.get("/last-15-days", async (req, res) => {
  const fechasUltimos15Dias = [];
  const token = req.headers[`access-token`];
  const decoded = jwtDecode(token);

  // Generar las fechas de los últimos 15 días y agregarlas al array
  for (let i = 0; i < 15; i++) {
    fechasUltimos15Dias.push(getFechaAtras(i));
  }

  const arrP = fechasUltimos15Dias.map(async (p) => {
    const fechaEspecifica = new Date(p);

    // Obtener la fecha de inicio del día
    const fechaInicioDia =
      fechaEspecifica.toISOString().substring(0, 10) + "T00:00:00.000Z";
    // Obtener la fecha de fin del día

    const fechaFinDia =
      fechaEspecifica.toISOString().substring(0, 10) + "T23:59:59.999Z";

    /* const fechaFinDia = new Date(fechaEspecifica);
    fechaFinDia.setHours(23 , 59, 59, 999); */
    console.log(fechaInicioDia, fechaFinDia);

    const result = await Factura.findOne({
      attributes: [
        [Sequelize.fn("DATE", Sequelize.col("fechaPagado")), "time"], // Obtener solo la fecha (sin la hora)
        [Sequelize.fn("SUM", Sequelize.col("Factura.montoTotal")), "value"], // Obtener la suma del monto de los pagos
      ],
      include: [
        {
          model: Contracto,
          include: { model: Proyecto, include: Presupuesto },
        },
      ],
      where: {
        fechaPagado: {
          [Sequelize.Op.gte]: fechaInicioDia,
          [Sequelize.Op.lt]: fechaFinDia,
        },
        "$Contracto.Proyecto.Presupuesto.UsuarioId$": { [Op.eq]: decoded.id },
      },
    });
    if (result.dataValues.time === null) {
      return {
        time: fechaEspecifica.toISOString().substring(0, 10),
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

export default FacturaRouter;
