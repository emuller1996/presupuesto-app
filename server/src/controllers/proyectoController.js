const { Proyecto, Presupuesto, Contracto, Factura } = require("../db.js");

const getProyectoById = async (req, res) => {
    try {
        const proyectoById = await Proyecto.findByPk(req.params.id)
        const dataAdd = {
            gastoPorcentaje: (proyectoById.montoUsado / proyectoById.montoTotal) * 100,
            restantePorcenjate: (proyectoById.montoDisponible / proyectoById.montoTotal) * 100,
            asignadoPorcentaje: (proyectoById.montoAsignado / proyectoById.montoTotal) * 100
        }
        const t = Object.assign(proyectoById.dataValues, dataAdd)

        return res.status(200).json(t)
    } catch (error) {
        console.log(error);
        return res.status(404).json({ error: error.message })
    }
}

const getContractosByProyecto = async (req, res) => {
    try {
        const contractos = await Contracto.findAll({ where: { ProyectoId: req.params.id } })
        return res.status(200).json(contractos)
    } catch (error) {
        console.log(error);

    }
}

const getFacturasByProyecto = async (req, res) => {
    const idProyecto = req.params.id
    try {
        const facturas = await Factura.findAll({ include: [{ model: Contracto, where: { ProyectoId: idProyecto } }] })
        return res.status(200).json(facturas)
    } catch (error) {
        console.log(error);

    }
}

const createContractoProyecto = async (req, res) => {

    const data = req.body;
    try {

        const contracto = await Contracto.create(data);

        const proyecto = await Proyecto.findByPk(data.ProyectoId)
        proyecto.montoAsignado += data.monto_total;
        proyecto.montoDisponible -= data.monto_total;
        proyecto.save()
        return res.status(201).json({ message: "Contracto Creado!", contracto })
    } catch (error) {
        console.log(error);
    }
}

const updateProyectoById = async (req, res) => {
    try {
        const data = req.body;
        const presu = await Presupuesto.findByPk(data.PresupuestoId)
        const pro = await Proyecto.findByPk(req.params.id);
        presu.totalAsignado -= pro.dataValues.montoTotal;
        presu.totalRestante -= pro.dataValues.montoTotal;
        data.montoDisponible = data.montoTotal - (pro.dataValues.montoAsignado + pro.dataValues.montoUsado)

        if (data.montoTotal < pro.dataValues.montoAsignado) {
            return res.status(422).json({message : `el proyecto ya tiene ${pro.dataValues.montoAsignado}, no se puede cambiar el monto todal a ${data.montoTotal}`})
        }
        const p = await Proyecto.update(data, { where: { id: req.params.id } })

        presu.totalAsignado += data.montoTotal;
        presu.totalRestante = presu.totalCantidad - presu.totalAsignado;

        await presu.save();

        return res.status(202).json({ message: "si se actualizo correctamente.", proyecto: p })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProyectoById,
    updateProyectoById,
    getContractosByProyecto,
    createContractoProyecto,
    getFacturasByProyecto
};