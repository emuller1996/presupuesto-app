import { Factura, Proyecto, Presupuesto, Contracto } from "../db.js";

const createFactura = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const factura = await Factura.create(data);
    console.log(data.ContractoId);
    const contracto = await Contracto.findByPk(data.ContractoId);

    if (parseInt(data.montoTotal) > contracto.monto_disponible) {
      return res.status(422).json({
        message: `el contracto no tiene fondos para la factura, tiene disponible ${contracto.monto_disponible}`,
      });
    }

    contracto.monto_usado += parseInt(data.montoTotal);
    contracto.monto_disponible -= parseInt(data.montoTotal);

    const proyecto = await Proyecto.findByPk(data.ProyectoId);
    proyecto.montoUsado += parseInt(data.montoTotal);
    proyecto.montoAsignado -= parseInt(data.montoTotal);

    const presupueso = await Presupuesto.findByPk(
      proyecto.dataValues.PresupuestoId
    );
    presupueso.totalGasto += parseInt(data.montoTotal);
    presupueso.totalAsignado -= parseInt(data.montoTotal);
    console.log(presupueso);
    await contracto.save();
    await presupueso.save();
    await proyecto.save();
    return res.json({ factura, message: "Factura Creada" });
  } catch (error) {
    console.log(error);
  }
};

export { createFactura };
