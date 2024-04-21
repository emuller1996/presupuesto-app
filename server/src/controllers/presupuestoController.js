import bodyParser from "body-parser";
import jwtDecode from "jwt-decode";

import { Proyecto, Presupuesto, Contracto, Factura } from "../db.js";
const getTodosPresupuesto = async (req, res) => {
  try {
    const token = req.headers[`access-token`];
    const decoded = jwtDecode(token);
    const products = await Presupuesto.findAll({
      where: { UsuarioId: decoded.id },
    });
    return res.status(200).json(products);
  } catch {
    res.status(201).json({ error: "Presupuesto Error" });
  }
};

const createPresupuesto = async (req, res) => {
  const dataPresupuesto = req.body;
  const token = req.headers[`access-token`];
  const decoded = jwtDecode(token);
  try {
    const presupuestoCreado = await Presupuesto.create({
      ...dataPresupuesto,
      UsuarioId: decoded.id,
    });
    return res
      .status(201)
      .json({ message: "Presupuesto Creadio", presupuesto: presupuestoCreado });
  } catch (error) {}
};
const getPresupuestoById = async (req, res) => {
  try {
    const token = req.headers[`access-token`];
    const decoded = jwtDecode(token);

    const presupuestoById = await Presupuesto.findByPk(req.params.id);
    const dataAdd = {
      gastoPorcentaje:
        (presupuestoById.totalGasto / presupuestoById.totalCantidad) * 100,
      restantePorcenjate:
        (presupuestoById.totalRestante / presupuestoById.totalCantidad) * 100,
      asignadoPorcentaje:
        (presupuestoById.totalAsignado / presupuestoById.totalCantidad) * 100,
    };
    const t = Object.assign(presupuestoById.dataValues, dataAdd);
    console.log(decoded.id,presupuestoById.UsuarioId ,decoded.id != presupuestoById.UsuarioId);
    if (decoded.id != presupuestoById.UsuarioId) {
      return res.status(404).json({ error: "HEY NO !" });
    }
    return res.status(200).json(t);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};

const createProyectoByPresupuesto = async (req, res) => {
  const dataProyecto = req.body;
  try {
    dataProyecto.montoAsignado = 0;
    const presupuesto = await Presupuesto.findByPk(req.params.id);
    if (dataProyecto.montoTotal > presupuesto.totalRestante) {
      return res.status(422).json({
        message: `El presupuesto no tiene fondos para el proyecto, solo tiene disponible ${presupuesto.totalRestante}`,
      });
    }
    presupuesto.totalAsignado += dataProyecto.montoTotal;
    presupuesto.totalRestante -= dataProyecto.montoTotal;
    presupuesto.save();
    const proyectoCreate = await Proyecto.create(dataProyecto);
    return res.json({
      message: "Se Creo correctamente el proyecto",
      proyecto: proyectoCreate,
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
};

const getProyectoByPresupuesto = async (req, res) => {
  try {
    const proyectosTodos = await Proyecto.findAll({
      where: { PresupuestoId: req.params.id },
    });
    return res.json(proyectosTodos);
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
};

export {
  getTodosPresupuesto,
  createPresupuesto,
  getPresupuestoById,
  createProyectoByPresupuesto,
  getProyectoByPresupuesto,
};
