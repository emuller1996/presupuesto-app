import { Link, useParams } from "react-router-dom";
import { useProyecto } from "../../hooks/useProyecto";
import { useEffect, useRef, useState } from "react";
import CardProyecto from "../Proyectos/components/CardProyecto";
import CardContractos from "./components/CardContractos";
import MyModal from "../../components/_Modal";
import FormContracto from "./components/FormContracto";
import { useReactToPrint } from "react-to-print";

export default function ProyectoDetallePages() {
  const { idProyectos } = useParams();
  const [openModal, setOpenModal] = useState(false);

  const { dataDetail, getProyectosById, getContractosByProyecto, Contractos } =
    useProyecto();

  useEffect(() => {
    getProyectosById(idProyectos);
    getContractosByProyecto(idProyectos);
  }, [idProyectos]);
  const componenteRef = useRef();
  const prinData = useReactToPrint({
    content: () => componenteRef.current,
    copyStyles: true,
    documentTitle: `PROYECTO - ${dataDetail?.nombre}`,
  });

  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={prinData}
          type="button"
          className="text-white flex uppercase bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-semibold rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
        >
          <svg
            className="w-6 h-6 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16.444 18H19a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2.556M17 11V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4Z"
            />
          </svg>
          Imprimir
        </button>
      </div>
      <div className="p-2" ref={componenteRef}>
        {dataDetail && <CardProyecto proyecto={dataDetail} />}

        <hr className="my-4 border" />
        <div className=" flex">
          <button
            onClick={() => {
              setOpenModal(true);
            }}
            type="button"
            className="text-white flex bg-gradient-to-br from-purple-500 to-purple-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-semibold uppercase rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
          >
            <svg
              className="w-6 h-6 text-white"
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
                d="M10 3v4a1 1 0 0 1-1 1H5m4 10v-2m3 2v-6m3 6v-3m4-11v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
              />
            </svg>
            Crear Contracto
          </button>
          <Link to={`/proyectos/${idProyectos}/facturas`}>
            <button
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
              FACTURAS
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Contractos && Contractos.length === 0 && (
            <div className="text-center col-span-2">
              <p className="font-semibold text-purple-900">NO HAY CONTRACTOS</p>
            </div>
          )}
          {Contractos &&
            Array.isArray(Contractos) &&
            Contractos.map((c) => (
              <CardContractos
                key={c.id}
                contracto={c}
                className="border p-4"
              ></CardContractos>
            ))}
        </div>

        <MyModal
          show={openModal}
          setShow={setOpenModal}
          title="Crear Nuevo Contracto"
        >
          <FormContracto
            proyectoId={`${idProyectos}`}
            getAllContracs={getContractosByProyecto}
            getProyectoDetail={getProyectosById}
            setShow={setOpenModal}
          />
        </MyModal>
      </div>
    </>
  );
}
