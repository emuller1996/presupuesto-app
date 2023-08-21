const { Factura, Proyecto, Presupuesto } = require("../db")

const createFactura = async (req, res) => {
    const data = req.body
    console.log(data);
    try {
        const factura = await Factura.create(data);
        const proyecto = await Proyecto.findByPk(data.ProyectoId)
        console.log(proyecto.dataValues);
        proyecto.montoUsado += parseInt(data.montoTotal);
        proyecto.montoAsignado -= parseInt(data.montoTotal);

        const presupueso = await Presupuesto.findByPk(proyecto.dataValues.PresupuestoId)
        presupueso.totalGasto += parseInt(data.montoTotal);
        presupueso.totalAsignado -= parseInt(data.montoTotal);
        console.log(presupueso);
        await presupueso.save()
        await proyecto.save();
        return res.json({ factura, message: "Factura Creada" })
    } catch (error) {
        console.log(error);

    }

}

module.exports = {
    createFactura
};