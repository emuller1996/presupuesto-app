import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProyecto } from "../../../hooks/useProyecto";
import MyModal from "../../../components/_Modal";
import FormFacturas from "./components/FormFacturas";
import CardFacturas from "./components/CardFacturas";

export default function FacturasProyectoPage() {
  const { idProyectos } = useParams();
  const [openModal, setOpenModal] = useState(false);

  const { Facturas, getFacturasByProyecto } = useProyecto();


  useEffect(() => {
    getFacturasByProyecto(idProyectos);
  }, [idProyectos]);

  return (
    <div>
      <div className=" flex">
        <button
          onClick={() => {
            setOpenModal(true);
          }}
          type="button"
          className="text-white flex uppercase bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-semibold rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
        >
          <svg
            className="w-6 h-6 text-white me-2"
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
              strokeWidth="2"
              d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
            />
          </svg>
          CREAR FACTURAS
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {Facturas && Facturas.length === 0 && (
          <div className="text-center col-span-2">
            <p className="font-semibold text-purple-900">NO HAY FACTURAS</p>
          </div>
        )}
        {Facturas &&
          Array.isArray(Facturas) &&
          Facturas.map((c) => (
            <CardFacturas
              key={c.id}
              factura={c}
            ></CardFacturas>
          ))}
      </div>

      <MyModal
        show={openModal}
        setShow={setOpenModal}
        title="Crear Nuevo Contracto"
      >
        <FormFacturas
          setShow={setOpenModal}
          getFacturasTodasByProyecto={getFacturasByProyecto}
        />
      </MyModal>
    </div>
  );
}
