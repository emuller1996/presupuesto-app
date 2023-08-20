const { Presupuesto } = require("../db.js");

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
    return res.status(200).json(presupuestoById)
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message })
  }
}

module.exports = {
  getTodosPresupuesto,
  createPresupuesto,
  getPresupuestoById
};