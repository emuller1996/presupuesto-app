const { json } = require("body-parser");
const { Presupuesto, Proyecto } = require("../db.js");

const getTodosPresupuesto = async (req, res) => {
  try {
    const products = await Presupuesto.findAll();
    return res.status(200).json(
      products
    );
  } catch {
    res.status(201).json({ error: "Presupuesto Error" });
  }
};


const createPresupuesto = async (req, res) => {
  const dataPresupuesto = req.body
  try {
    console.log(dataPresupuesto);
    const presupuestoCreado = await Presupuesto.create(dataPresupuesto);
    return res.status(201).json({ message: "Presupuesto Creadio", presupuesto: presupuestoCreado })
  } catch (error) {

  }
}
const getPresupuestoById = async (req, res) => {
  try {
    console.log(req.params);
    const presupuestoById = await Presupuesto.findByPk(req.params.id)
    console.log("procentaje : gasto : ", (presupuestoById.totalGasto / presupuestoById.totalCantidad) * 100);
    console.log("porcentaje : restante : ", (presupuestoById.totalRestante / presupuestoById.totalCantidad) * 100);
    console.log("porcentaje : asignado ", (presupuestoById.totalAsignado / presupuestoById.totalCantidad) * 100);
    const dataAdd = {
      gastoPorcentaje: (presupuestoById.totalGasto / presupuestoById.totalCantidad) * 100,
      restantePorcenjate: (presupuestoById.totalRestante / presupuestoById.totalCantidad) * 100,
      asignadoPorcentaje: (presupuestoById.totalAsignado / presupuestoById.totalCantidad) * 100
    }
    const t = Object.assign(presupuestoById, dataAdd)
    console.log(presupuestoById);

    return res.status(200).json(presupuestoById)
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message })
  }
}

const createProyectoByPresupuesto = async (req, res) => {
  const dataProyecto = req.body;
  try {

    const presupuesto = await Presupuesto.findByPk(req.params.id);
    presupuesto.totalAsignado += dataProyecto.montoTotal;
    presupuesto.save()
    const proyectoCreate = await Proyecto.create(dataProyecto)
    return res.json({ message: "Se Creo correctamente el proyecto", proyecto: proyectoCreate })

  } catch (error) {
    console.log(error);
    return res.json({ error: error.message })
  }
}

const getProyectoByPresupuesto = async (req, res) => {
  try {
    const proyectosTodos = await Proyecto.findAll({ where: { PresupuestoId: req.params.id } })
    return res.json(proyectosTodos)
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message })
  }

}

module.exports = {
  getTodosPresupuesto,
  createPresupuesto,
  getPresupuestoById,
  createProyectoByPresupuesto,
  getProyectoByPresupuesto
};