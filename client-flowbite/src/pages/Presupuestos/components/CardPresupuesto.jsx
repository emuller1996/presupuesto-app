import PropTypes from "prop-types";
import { ViewDollar } from "../../../utils";
import { Link } from "react-router-dom";

export default function CardPresupuesto({ presupuesto }) {
  return (
    <div className="border border-blue-300 rounded-md  p-4 hover:border-blue-400 hover:shadow-md hover:shadow-blue-100">
      <p className="text-center text-blue-700 font-semibold text-lg">
        {presupuesto?.descripcion}
      </p>
      <div className="text-blue-900">
        <div className="flex justify-between">
          <span>Total Presupuesto</span>
          <span className="font-semibold">{ViewDollar(presupuesto?.totalCantidad)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Libre</span>
          <span>{ViewDollar(presupuesto?.totalRestante)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Asignado</span>
          <span>{ViewDollar(presupuesto?.totalAsignado)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Gastado</span>
          <span> {ViewDollar(presupuesto?.totalGasto)}</span>
        </div>
      </div>
      <hr className="border my-3" />
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-blue-700 dark:text-white">
          Total Asignado
        </span>
        <span className="text-sm font-medium text-blue-700 dark:text-white">
          {`${parseInt(
            (presupuesto?.totalAsignado / presupuesto?.totalCantidad) * 100
          )}%`}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{
            width: `${
              (presupuesto?.totalAsignado / presupuesto?.totalCantidad) * 100
            }%`,
          }}
        ></div>
      </div>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-red-700 dark:text-white">
          Total Gastado
        </span>
        <span className="text-sm font-medium text-red-700 dark:text-white">
          {`${parseInt(
            (presupuesto?.totalGasto / presupuesto?.totalCantidad) * 100
          )}%`}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-red-600 h-2.5 rounded-full"
          style={{
            width: `${
              (presupuesto?.totalGasto / presupuesto?.totalCantidad) * 100
            }%`,
          }}
        ></div>
      </div>
      <div className="text-center mt-4">
        <Link
          to={`/presupuesto/${presupuesto.id}`}
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Detalle
        </Link>
      </div>
    </div>
  );
}

CardPresupuesto.propTypes = {
  presupuesto: PropTypes.object.isRequired,
};
