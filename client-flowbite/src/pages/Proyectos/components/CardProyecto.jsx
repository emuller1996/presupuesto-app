import PropTypes from "prop-types";
import { ViewDollar } from "../../../utils";
import { Link, useLocation } from "react-router-dom";
export default function CardProyecto({ proyecto, hadleModalOpen }) {
  const { pathname } = useLocation();
  return (
    <div className="border border-orange-300 rounded-md  p-4 hover:border-orange-400 hover:shadow-md hover:shadow-orange-100">
      <p className="text-start text-orange-700 font-semibold text-xl">
        {proyecto?.nombre}
      </p>
      <hr className="border my-2 border-orange-300" />
      <div className="text-orange-900">
        {proyecto.Presupuesto && (
          <div className="flex flex-wrap justify-between">
            <span>Presupuesto</span>
            <span className="font-semibold">
              {proyecto?.Presupuesto?.descripcion}
            </span>
          </div>
        )}
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
            width: `${(proyecto?.montoAsignado / proyecto?.montoTotal) * 100}%`,
          }}
        ></div>
      </div>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-red-700 dark:text-white">
          Total Gastado
        </span>
        <span className="text-sm font-medium text-red-700 dark:text-white">
          {`${parseInt((proyecto?.montoUsado / proyecto?.montoTotal) * 100)}%`}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-red-600 h-2.5 rounded-full"
          style={{
            width: `${(proyecto?.montoUsado / proyecto?.montoTotal) * 100}%`,
          }}
        ></div>
      </div>
      <div className="text-center mt-4">
        {pathname !== `/proyectos/${proyecto.id}` && (
          <Link to={`/proyectos/${proyecto.id}`}>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <svg
                className="w-6 h-6 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                />
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
          </Link>
        )}
        {hadleModalOpen && (
          <button
            onClick={hadleModalOpen}
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            <svg
              className="w-6 h-6 text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

CardProyecto.propTypes = {
  proyecto: PropTypes.object.isRequired,
  hadleModalOpen: PropTypes.func,
};
