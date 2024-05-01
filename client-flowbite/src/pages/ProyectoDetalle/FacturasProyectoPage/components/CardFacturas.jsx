import PropTypes from "prop-types";
import { ViewDollar } from "../../../../utils";
export default function CardFacturas({ factura }) {
  return (
    <div className="border border-dashed border-green-300   p-4 hover:border-green-400 hover:shadow-md hover:shadow-green-100">
      <p className="text-start flex items-center text-green-700 font-semibold text-xl">
        <small className="font-light text-sm">Contracto</small>
        <svg
          className="w-6 h-6 text-green-800 dark:text-white"
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
            d="m10 16 4-4-4-4"
          />
        </svg>
        {factura?.Contracto?.nombre}
      </p>
      <hr className="border my-2 border-green-300" />
      <div className="text-green-900">
      <div className="flex justify-between">
          <span>Fecha</span>
          <span className="">
          {factura?.fechaPagado.substring(0,10)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Estado</span>
          <span className="bg-green-100 uppercase text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
          {factura?.estado}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Concepto </span>
          <span> {factura?.concepto}</span>
        </div>

        
        
      </div>
      <hr className="border border-green-300 my-3" />
      <div className="flex justify-between">
          <span>Total </span>
          <span className="font-bold text-lg text-green-600"> {ViewDollar(factura?.montoTotal)}</span>
        </div>
    </div>
  );
}

CardFacturas.propTypes = {
  factura: PropTypes.object.isRequired,
};
