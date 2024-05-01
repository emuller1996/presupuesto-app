import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import {
  createPresupuestoServicio,
  updatePresupuestoServicio,
} from "../../../services/presupuesto.servicios";
import CurrencyInput from "react-currency-input-field";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";


export default function FormPresupuesto({
  getAllPresupuesto,
  presupuesto,
  setShow,
}) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { token } = useContext(AuthContext);

  const onSubmit = async (data) => {
    data.totalCantidad = parseInt(data.totalCantidad);
    if (!presupuesto) {
      data.totalGasto = 0;
      data.totalGastoPorcentaje = 0;
      data.totalRestante = data.totalCantidad;
      console.log(data);

      try {
        const r = await createPresupuestoServicio(data,token);
        getAllPresupuesto();
        reset();
        console.log(r.data);
        setShow(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(data);
      data.id = presupuesto.id;
      if (!data.totalCantidad) {
        data.totalCantidad = presupuesto.totalCantidad;
      }
      try {
        await updatePresupuestoServicio(data,token);
        getAllPresupuesto();
        setShow(false);
      } catch (error) {
        console.log(error);
      }
    }
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
          defaultValue={presupuesto?.descripcion}
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
        {/* <input
          type="number"
          id="totalCantidad"
          {...register("totalCantidad", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        /> */}
        <CurrencyInput
          id="totalCantidad"
          name="totalCantidad"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          defaultValue={presupuesto?.totalCantidad}
          decimalsLimit={2}
          decimalSeparator=","
          groupSeparator="."
          onValueChange={(value) => {
            setValue("totalCantidad", value);
          }}
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
  presupuesto: PropTypes.object,
  setShow: PropTypes.func,
};
