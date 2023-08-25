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
        const proyecto = await Proyecto.findByPk(data.ProyectoId)
        if(data.monto_total > proyecto.montoDisponible){
            return res.status(422).json({message :`El proyecto no tiene fondos para el contracto, solo tiene disponible ${proyecto.montoDisponible}`})
          }

        const contracto = await Contracto.create(data);

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
            return res.status(422).json({message : `el proyecto ya tiene asignado ${pro.dataValues.montoAsignado}, no se puede permite esta accion.`})
        }
        
        presu.totalAsignado += data.montoTotal;
        presu.totalRestante = presu.totalCantidad - presu.totalAsignado;
        if(presu.totalRestante < 0 ){
            return res.status(422).json({message : `El presuesto no tiene fondos para actualizar el proyecto.`})
        }
        
        const p = await Proyecto.update(data, { where: { id: req.params.id } })
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