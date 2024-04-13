import PropTypes from "prop-types";
import { ViewDollar } from "../../../utils";
export default function CardProyecto({ proyecto }) {
  return (
    <div className="border border-orange-300 rounded-md  p-4 hover:border-orange-400 hover:shadow-md hover:shadow-orange-100">
      <p className="text-start text-orange-700 font-semibold text-xl">
        {proyecto?.nombre}
      </p>
      <hr className="border my-2 border-orange-300" />
      <div className="text-orange-900">
      <div className="flex justify-between">
          <span>Presupuesto</span>
          <span className="font-semibold">
            {proyecto?.Presupuesto?.descripcion}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Total Proyecto</span>
          <span className="font-semibold">
            {ViewDollar(proyecto?.montoTotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Total Libre</span>
          <span>{ViewDollar(proyecto?.montoDisponible)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Asignado</span>
          <span>{ViewDollar(proyecto?.montoAsignado)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Gastado</span>
          <span> {ViewDollar(proyecto?.montoUsado)}</span>
        </div>
      </div>
      <hr className="border my-3" />
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-blue-700 dark:text-white">
          Total Asignado
          {proyecto?.asignadoPorcentaje}
        </span>
        <span className="text-sm font-medium text-orange-700 dark:text-white">
          {`${parseInt(
            (proyecto?.montoAsignado / proyecto?.montoTotal) * 100
          )}%`}
        </span>
      </div>
       <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{
            width: `${
              (proyecto?.montoAsignado / proyecto?.montoTotal) * 100
            }%`,
          }}
        ></div>
      </div>
      {/*<div className="flex justify-between mb-1">
        <span className="text-base font-medium text-red-700 dark:text-white">
          Total Gastado
          {presupuesto?.asignadoPorcentaje}
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
      </div> */}
      <div className="text-center mt-4">
        <button
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Detalle
        </button>
      </div>
    </div>
  );
}

CardProyecto.propTypes = {
  proyecto: PropTypes.object.isRequired,
};
