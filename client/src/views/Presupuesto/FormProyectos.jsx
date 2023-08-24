import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function FormProyectoComponent({
  presupuestoSelecionado,
  proyecto,
  getProyectoByIdPresupuesto,
  getPresupuestobyId
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    data.montoTotal = parseInt(data.montoTotal);

    console.log(Object.assign(data, { PresupuestoId: presupuestoSelecionado }));

    if (proyecto) {
      try {
        const result = await axios.patch(
          `/proyectos/${proyecto.id}`,
          Object.assign(data)
        );
        console.log(result);
        await getProyectoByIdPresupuesto(presupuestoSelecionado);
        await getPresupuestobyId(presupuestoSelecionado)

        toast.success("Proyecto Actualizado Correctamente.");
      } catch (error) {
        console.log(error);
      toast.error(error.response.data.message)

      }
    } else {
      data.montoDisponible = parseInt(data.montoTotal);
      data.montoUsado = 0;
      try {
        const result = await axios.post(
          `/presupuestos/${presupuestoSelecionado}/proyectos`,
          Object.assign(data, { PresupuestoId: presupuestoSelecionado })
        );
        console.log(result);
        await getProyectoByIdPresupuesto(presupuestoSelecionado);
        await getPresupuestobyId(presupuestoSelecionado)
        toast.success("Proyecto Creado Correctamente.");
        reset();
      } catch (error) {
        console.log(error);
      toast.error(error.response.data.message)

      }
    }
  };

  /* const handleSubmit = async (e) => {
        e.preventDefault();
        inputProyecto.montoTotal = parseInt(inputProyecto.montoTotal);
        console.log(
          Object.assign(inputProyecto, { presupuestoId: presupuestoSelecionado })
        );
    
        try {
          const result = await axios.post(
            `http://localhost:3001/presupuestos/${presupuestoSelecionado}/proyectos`,
            Object.assign(inputProyecto, { presupuestoId: presupuestoSelecionado })
          );
          console.log(result);
          alert("PROYECTO CREADOS");
        } catch (error) {
          console.log(error);
        }
      }; */

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="modal-body">
        <div class="mb-3">
          <label for="nombre" class="form-label">
            Nombre Proyecto
          </label>
          <input
            type="text"
            class="form-control"
            id="nombre"
            name="nombre"
            defaultValue={proyecto && proyecto.nombre}
            {...register("nombre", { required: true })}
          />
          {errors.nombre && <span>Este campo es REQUERIDO!!!</span>}
        </div>
        <div class="mb-3">
          <label for="descripcion" class="form-label">
            Descripcion del Proyecto
          </label>
          <textarea
            class="form-control"
            id="descripcion"
            name="descripcion"
            defaultValue={proyecto && proyecto.descripcion}
            {...register("descripcion", { required: true })}
            rows="3"
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="montoTotal" class="form-label">
            Monto Total
          </label>
          <input
            type="number"
            class="form-control"
            id="montoTotal"
            name="montoTotal"
            defaultValue={proyecto && proyecto.montoTotal}
            {...register("montoTotal", { required: true })}
          />
        </div>
      <div class="py-2 text-center">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button type="submit" class="ms-3 btn btn-success">
           { proyecto ? "Editar Proyecto" :"Guardar Proyecto" }
        </button>
      </div>
      </div>
    </form>
  );
}
