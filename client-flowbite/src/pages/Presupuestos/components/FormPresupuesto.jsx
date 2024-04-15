import { useForm } from "react-hook-form";
import { createPresupuestoServicio } from "../../../../../client/src/services/presupuesto.servicios";
import PropTypes from "prop-types";

export default function FormPresupuesto({ getAllPresupuesto }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    data.totalCantidad = parseInt(data.totalCantidad);
    data.totalGasto = 0;
    data.totalGastoPorcentaje = 0;
    data.totalRestante = data.totalCantidad;
    console.log(data);

    try {
      await createPresupuestoServicio(data);
      await getAllPresupuesto();
      reset();
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="mb-3">
        <label
          htmlFor="descripcion"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nombre de Presupuesto.
        </label>
        <input
          type="text"
          id="descripcion"
          {...register("descripcion", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Valor del Presupuesto.
        </label>
        <input
          type="number"
          id="totalCantidad"
          {...register("totalCantidad", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mt-4 text-center">
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          CREAR PRESUPUESTO.
        </button>
      </div>
    </form>
  );
}
FormPresupuesto.propTypes = {
  getAllPresupuesto: PropTypes.func.isRequired,
};
