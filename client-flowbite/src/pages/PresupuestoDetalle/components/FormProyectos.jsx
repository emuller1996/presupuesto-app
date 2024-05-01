import axios from "axios";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";

export default function FormProyectoComponent({
  presupuestoSelecionado,
  proyecto,
  getProyectoByIdPresupuesto,
  getPresupuestobyId,
}) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setisLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const [messageSuccess, setMessageSuccess] = useState(null);
  const onSubmit = async (data) => {
    data.montoTotal = parseInt(data.montoTotal);

    console.log(Object.assign(data, { PresupuestoId: presupuestoSelecionado }));

    if (proyecto) {
      try {
        setisLoading(true);
        const result = await axios.patch(
          `/proyectos/${proyecto.id}`,
          Object.assign(data),
          {
            headers: { "access-token": token },
          }
        );
        console.log(result);
        await getProyectoByIdPresupuesto(presupuestoSelecionado);
        await getPresupuestobyId(presupuestoSelecionado);
        setisLoading(false);
        setMessageSuccess(result.data.message);
        setTimeout(() => {
          setMessageSuccess(null);
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    } else {
      data.montoDisponible = parseInt(data.montoTotal);
      data.montoUsado = 0;
      try {
        setisLoading(true);

        const result = await axios.post(
          `/presupuestos/${presupuestoSelecionado}/proyectos`,
          Object.assign(data, { PresupuestoId: presupuestoSelecionado }),
          {
            headers: { "access-token": token },
          }
        );
        console.log(result);
        await getProyectoByIdPresupuesto(presupuestoSelecionado);
        await getPresupuestobyId(presupuestoSelecionado);
        reset();
        setisLoading(false);
        setMessageSuccess(result.data.message);
        setTimeout(() => {
          setMessageSuccess(null);
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="modal-body">
        <div className="mb-3">
          <label
            htmlFor="nombre"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombre Proyecto
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="nombre"
            name="nombre"
            defaultValue={proyecto && proyecto.nombre}
            {...register("nombre", { required: true })}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="descripcion"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Descripcion del Proyecto
          </label>
          <textarea
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="descripcion"
            name="descripcion"
            defaultValue={proyecto && proyecto.descripcion}
            {...register("descripcion", { required: true })}
            rows="3"
          ></textarea>
        </div>
        <div className="mb-3">
          <label
            htmlFor="montoTotal"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Monto Total
          </label>
          <input
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="montoTotal"
            name="montoTotal"
            defaultValue={proyecto && proyecto.montoTotal}
            {...register("montoTotal", { required: true })}
          />
        </div>

        {messageSuccess && (
          <div
            className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 my-4"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Todo Bien !</span> {messageSuccess}
            </div>
          </div>
        )}
        <div className="py-2 text-center">
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            {isLoading ? (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              `${proyecto ? "Editar Proyecto" : "Guardar Proyecto"}`
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

FormProyectoComponent.propTypes = {
  presupuestoSelecionado: PropTypes.string.isRequired,
  proyecto: PropTypes.object,
  getProyectoByIdPresupuesto: PropTypes.func.isRequired,
  getPresupuestobyId: PropTypes.func.isRequired,
};
