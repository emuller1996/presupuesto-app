import { useParams } from "react-router-dom";
import { usePresupuesto } from "../../hooks/usePresupuesto";
import { useEffect, useRef, useState } from "react";
import CardPresupuesto from "../Presupuestos/components/CardPresupuesto";
import CardProyecto from "../Proyectos/components/CardProyecto";
import FormProyectoComponent from "./components/FormProyectos";
import MyModal from "../../components/_Modal";
import { useReactToPrint } from "react-to-print";

export default function PresupuestoDetalle() {
  const { idPresupuesto } = useParams();
  const {
    dataDetail,
    Proyectos,
    getPresupuestoById,
    getProyectosByPresupuesto,
  } = usePresupuesto();
  const [open, setOpen] = useState(false);
  const [openE, setOpenE] = useState(false);

  const handleOpen = () => setOpen(true);
  const [proyectoSelec, setProyectoSelec] = useState(null);

  useEffect(() => {
    getPresupuestoById(idPresupuesto);
    getProyectosByPresupuesto(idPresupuesto);
  }, [idPresupuesto]);

  const componenteRef = useRef();
  const prinData = useReactToPrint({
    content: () => componenteRef.current,
    copyStyles: true,
    documentTitle: `PRESUPUESTO - ${dataDetail?.descripcion}`,
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
        {dataDetail && <CardPresupuesto presupuesto={dataDetail} />}
        <hr className="my-4 border" />
        <div className="">
          <button
            onClick={handleOpen}
            type="button"
            className="text-white flex uppercase bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-semibold rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
          >
            <svg
              className="w-6 h-6 text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M4 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2V5a1 1 0 0 1-1-1Zm5 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1Zm-5 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Zm-3 4a2 2 0 0 0-2 2v3h2v-3h2v3h2v-3a2 2 0 0 0-2-2h-2Z"
                clipRule="evenodd"
              />
            </svg>
            Crear Proyecto
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Proyectos && Proyectos.length === 0 && (
            <div className="text-center col-span-2">
              <p className="font-semibold text-orange-900">NO HAY PROYECTOS</p>
            </div>
          )}
          {Proyectos &&
            Array.isArray(Proyectos) &&
            Proyectos.map((p) => (
              <CardProyecto
                hadleModalOpen={() => {
                  setProyectoSelec(p);
                  setOpenE(true);
                }}
                key={p.id}
                proyecto={p}
              />
            ))}
        </div>

        <MyModal
          show={open}
          setShow={setOpen}
          title={`Crear Nuevo Proyecto a ${dataDetail?.descripcion}`}
        >
          <FormProyectoComponent
            getProyectoByIdPresupuesto={getProyectosByPresupuesto}
            getPresupuestobyId={getPresupuestoById}
            presupuestoSelecionado={idPresupuesto}
          />
        </MyModal>

        <MyModal
          show={openE}
          setShow={setOpenE}
          title={`Editar Proyecto a ${dataDetail?.descripcion}`}
        >
          <FormProyectoComponent
            getProyectoByIdPresupuesto={getProyectosByPresupuesto}
            getPresupuestobyId={getPresupuestoById}
            presupuestoSelecionado={idPresupuesto}
            proyecto={proyectoSelec}
          />
        </MyModal>
      </div>
    </>
  );
}
