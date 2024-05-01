import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { crearContractoProyectosServicio } from "../../../services/proyectos.servicios";
import CurrencyInput from "react-currency-input-field";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

export default function FormContracto({
  contracto,
  proyectoId,
  getAllContracs,
  setShow,
  getProyectoDetail,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { token } = useContext(AuthContext);

  const onSubmit = async (data) => {
    data.monto_total = parseInt(data.monto_total);
    data.monto_disponible = parseInt(data.monto_total);
    data.ProyectoId = proyectoId;
    data.fecha_creado = new Date().toISOString();

    try {
      await crearContractoProyectosServicio(
        Object.assign(data, { monto_usado: 0 }),
        token
      );
      reset();
      await getAllContracs(proyectoId);
      await getProyectoDetail(proyectoId);
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label
            htmlFor="nombre"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombre Contracto
          </label>
          <input
            type="text"
            className="hbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        <div className="mb-3">
          <label
            htmlFor="monto_total"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Montal Total
          </label>
          {/* <input
            type="number"
            className="hbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="monto_total"
            {...register("monto_total", { required: true })}
          /> */}
          <CurrencyInput
            id="monto_total"
            name="monto_total"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={contracto?.monto_total}
            decimalsLimit={2}
            decimalSeparator=","
            groupSeparator="."
            onValueChange={(value) => {
              setValue("monto_total", value);
            }}
          />
          {errors.monto_total && (
            <span className="text-danger ps-3">
              El Monto total es requerido.
            </span>
          )}
        </div>

        <div className="mb-3 text-center">
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            GUARDAR
          </button>
        </div>
      </form>
    </div>
  );
}

FormContracto.propTypes = {
  proyectoId: PropTypes.string,
  contracto: PropTypes.object,
  getAllContracs: PropTypes.func,
  setShow: PropTypes.func,
  getProyectoDetail: PropTypes.func,
};
