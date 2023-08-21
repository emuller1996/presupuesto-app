import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { createFacturaService } from "../../services/facturas.services";
import { useParams } from "react-router-dom";
import { getAllcontractosByProyectosService } from "../../services/proyectos.servicios";

export default function FormFacturas({
    setShow
}) {

    const [contractos, setContractos] = useState(undefined)
    const { id } = useParams()

    useEffect(() => {
        getTodosContractos()
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {

        data.fechaPagado = new Date().toISOString();
        data.estado = "Pagada"
        data.ContractoId = parseInt(data.ContractoId)
        data.ProyectoId = id;

        console.log(data);
        try {
            await createFacturaService(data);
            setShow(false)
            reset()
        } catch (error) {

        }



    };


    const getTodosContractos = async () => {
        try {
            const a = await getAllcontractosByProyectosService(id);
            setContractos(a)
        } catch (error) {

        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div class="modal-body">

                <div class="mb-3">
                    <label for="nombre" class="form-label">
                        Concepto Factura
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="concepto"
                        {...register("concepto", { required: true })}
                    />
                    {errors.concepto && <span> Este campo es REQUERIDO!!!</span>}
                </div>

                <div class="mb-3">
                    <label for="nombre" class="form-label">
                        Monto Total
                    </label>
                    <input
                        type="number"
                        class="form-control"
                        id="montoTotal"
                        {...register("montoTotal", { required: true })}
                    />
                    {errors.montoTotal && <span> Este campo es REQUERIDO!!!</span>}
                </div>

                <div class="mb-3">
                    <label for="nombre" class="form-label">
                        Selecione Contracto .
                    </label>
                    <select class="form-select"  {...register("ContractoId", { required: true })} aria-label="Default select example">
                        <option ></option>
                        {
                            contractos && contractos.map(c => (
                                <option value={c.id} >{c.nombre}</option>
                            ))
                        }

                    </select>
                    {errors.ContractoId && <span> Este campo es REQUERIDO!!!</span>}
                </div>

                <div class="py-2 text-center">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                    <button type="submit" class="ms-3 btn btn-success">
                        Guardar Proyecto
                    </button>
                </div>
            </div>
        </form>
    );
}
