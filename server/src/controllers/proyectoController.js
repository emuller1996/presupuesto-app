const { Proyecto, Presupuesto, Contracto } = require("../db.js");

const getProyectoById = async (req, res) => {
    try {
        const proyectoById = await Proyecto.findByPk(req.params.id)

        return res.status(200).json(proyectoById)
    } catch (error) {
        console.log(error);
        return res.status(404).json({ error: error.message })
    }
}

const getContractosByProyecto = async (req, res) => {
    try {
        const contractos = await Contracto.findAll({ where: { id: req.params.id } })
        console.log(contractos);
        return res.status(200).json(contractos)
    } catch (error) {
        console.log(error);

    }
}

const createContractoProyecto = async (req, res) => {

    const data = req.body;
    try {
        const contracto = await Contracto.create(data);
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

        console.log(presu.dataValues);
        console.log(pro.dataValues);


        const p = await Proyecto.update(data, { where: { id: req.params.id } })
        console.log(p);
        presu.totalAsignado += data.montoTotal;
        presu.totalRestante = presu.totalCantidad - presu.totalAsignado;

        await presu.save();
        console.log(presu);



        console.log(p);


        return res.status(202).json({ message: "si se actualizo correctamente.", proyecto: p })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProyectoById,
    updateProyectoById,
    getContractosByProyecto,
    createContractoProyecto
};