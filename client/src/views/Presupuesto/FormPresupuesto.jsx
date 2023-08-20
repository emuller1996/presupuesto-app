import React from "react";
import { useForm } from "react-hook-form";
import { createPresupuestoServicio, updatePresupuestoServicio } from "../../services/presupuesto.servicios";
import { toast } from "react-hot-toast";

export default function FormPresupuestoComponent({
  presupuesto,
  setShowModalPresupuesto,
  getPresupuestosTodos,
  getPresupuestobyId,
  
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
      data.totalCantidad = parseInt(data.totalCantidad);
    if (!presupuesto) {
      data.totalGasto = 0;
      data.totalGastoPorcentaje = 0;
      data.totalRestante = data.totalCantidad;
      console.log(data);

      try {
        await createPresupuestoServicio(data);
        toast.success("Presupuesto creado correctamente.");
        getPresupuestosTodos();
        reset();
        setShowModalPresupuesto(false);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      console.log(data);
      data.id = presupuesto.id;
      try {
        await updatePresupuestoServicio(data);
        getPresupuestobyId(data.id)
        getPresupuestosTodos();
        toast.success("Presupuesto actualizado correctamente.");
        setShowModalPresupuesto(false);
      } catch (error) {
        toast.error(error.message)
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="mb-3">
          <label htmlFor="descripcion" class="form-label">
            Nombre Proyecto
          </label>
          <input
            type="text"
            class="form-control"
            id="descripcion"
            name="descripcion"
            defaultValue={presupuesto && presupuesto.descripcion}
            {...register("descripcion", { required: true })}
          />
          {errors.descripcion && (
            <span className="ms-3 text-danger">Este campo es REQUERIDO!!!</span>
          )}
        </div>

        <div class="mb-3">
          <label htmlFor="totalCantidad" class="form-label">
            Monto Total
          </label>
          <input
            type="number"
            class="form-control"
            id="totalCantidad"
            name="totalCantidad"
            defaultValue={presupuesto && presupuesto.totalCantidad}
            {...register("totalCantidad", { required: true })}
          />
        </div>

        <div className="mb-3 text-center">
          <button
            type="button"
            class="btn btn-danger me-3"
            onClick={() => setShowModalPresupuesto(false)}
          >
            Close
          </button>
          <button type="submit" class="btn btn-success">
            Guardar Presupuesto.
          </button>
        </div>
      </form>
    </>
  );
}
