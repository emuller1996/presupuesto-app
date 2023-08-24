import React from "react";
import { useForm } from "react-hook-form";
import { crearContractoProyectosServicio } from "../../services/proyectos.servicios";
import { toast } from "react-hot-toast";

export default function ContractoFormulario({
  contracto,
  proyectoId,
  getAllProyectos,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    data.monto_total = parseInt(data.monto_total);
    data.ProyectoId = parseInt(proyectoId);
    data.fecha_creado = new Date().toISOString();

    console.log(Object.assign(data, { monto_usado: 0, monto_disponible: 0 }));

    try {
      await crearContractoProyectosServicio(
        Object.assign(data, { monto_usado: 0, monto_disponible: 0 })
      );
      reset()
      await getAllProyectos(proyectoId);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="mb-3">
          <label for="nombre" class="form-label">
            Nombre Contracto
          </label>
          <input
            type="text"
            class="form-control"
            id="nombre"
            name="nombre"
            defaultValue={contracto ? contracto.nombre : ""}
            {...register("nombre", { required: true })}
          />

          {errors.nombre && (
            <span className="text-danger ps-3">
              El Nombre del contracto es requerido.
            </span>
          )}
        </div>
        <div class="mb-3">
          <label for="monto_total" class="form-label">
            Montal Total
          </label>
          <input
            type="number"
            class="form-control"
            id="monto_total"
            {...register("monto_total", { required: true })}
          />
          {errors.monto_total && (
            <span className="text-danger ps-3">
              El Monto total es requerido.
            </span>
          )}
        </div>

        <div class="mb-3">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            Cancelar
          </button>
          <button type="submit" class="btn btn-success">
            Guardar Contracto
          </button>
        </div>
      </form>
    </div>
  );
}
