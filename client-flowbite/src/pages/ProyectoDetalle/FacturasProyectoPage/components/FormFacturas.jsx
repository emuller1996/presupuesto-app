import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { createFacturaService } from "../../../../services/facturas.services";
import { useProyecto } from "../../../../hooks/useProyecto";
import CurrencyInput from "react-currency-input-field";
import { ViewDollar } from "../../../../utils";
import AuthContext from "../../../../context/AuthContext";

export default function FormFacturas({ setShow, getFacturasTodasByProyecto }) {
  const { idProyectos } = useParams();
  const { getContractosByProyecto, Contractos } = useProyecto();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    getContractosByProyecto(idProyectos);
  }, []);

  const { register, handleSubmit, reset, setValue } = useForm();

  const onSubmit = async (data) => {
    data.fechaPagado = new Date().toISOString();
    data.estado = "Pagada";
    data.ProyectoId = idProyectos;

    console.log(data);
    try {
      await createFacturaService(data, token);
      await getFacturasTodasByProyecto(idProyectos);
      reset();
      setShow(false);
    } catch (error) {
      console.log(error);
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
            Concepto Factura
          </label>
          <input
            type="text"
            className="hbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="concepto"
            {...register("concepto", { required: true })}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="nombre"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Monto Total
          </label>
          {/* <input
            type="number"
            className="hbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="montoTotal"
            {...register("montoTotal", { required: true })}
          /> */}
          <CurrencyInput
            id="montoTotal"
            name="montoTotal"
            required
            className="hbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            decimalSeparator=","
            groupSeparator="."
            prefix="$"
            onValueChange={(value) => {
              setValue("montoTotal", value);
            }}
          />
        </div>

        {/* <div className="mb-3">
          <label
            htmlFor="nombre"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Selecione Contracto .
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("ContractoId", { required: true })}
            aria-label="Default select example"
            size="4"
          >
            {Contractos &&
              Contractos.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre} {ViewDollar(c.monto_disponible)}
                </option>
              ))}
          </select>
        </div> */}

        <div>
          <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
            {Contractos &&
              Contractos.map((c) => (
                <li key={c.id}>
                  <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <div className="flex items-center h-5">
                      <input
                        id={c.id}
                        name="helper-radio"
                        type="radio"
                        value={c.id}
                        {...register("ContractoId", { required: true })}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                    </div>
                    <div className="ms-2 text-sm">
                      <label
                        htmlFor={c.id}
                        className="font-medium text-gray-900 dark:text-gray-300"
                      >
                        <div>{c.nombre}</div>
                        <p
                          id="helper-radio-text-5"
                          className="text-xs font-normal text-gray-500 dark:text-gray-300"
                        >
                          Disponible : {ViewDollar(c.monto_disponible)}
                        </p>
                      </label>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="py-2 text-center">
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Guardar Proyecto
          </button>
        </div>
      </div>
    </form>
  );
}

FormFacturas.propTypes = {
  getFacturasTodasByProyecto: PropTypes.func,
  setShow: PropTypes.func,
};
