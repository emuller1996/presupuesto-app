import { useEffect, useState } from "react";
import { usePresupuesto } from "../../hooks/usePresupuesto";
import CardPresupuesto from "./components/CardPresupuesto";
import FormPresupuesto from "./components/FormPresupuesto";
import MyModal from "../../components/_Modal";
export default function PresupuestosPages() {
  const { data, getAllPresupuesto } = usePresupuesto();
  const [openModal, setOpenModal] = useState(false);
  const [openModalE, setOpenModalE] = useState(false);

  const [presuSelected, setpresuSelected] = useState(null);
  useEffect(() => {
    getAllPresupuesto();
  }, []);

  return (
    <div>
      <div className="mb-2">
        <button
          onClick={() => setOpenModal(true)}
          className="text-white flex uppercase bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
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
              d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
            />
          </svg>
          CREAR Presupuesto
        </button>
      </div>

      <MyModal
        show={openModal}
        setShow={setOpenModal}
        title="Crear Nuevo Presupuesto"
      >
        <FormPresupuesto
          getAllPresupuesto={getAllPresupuesto}
          setShow={setOpenModal}
        />
      </MyModal>

      <MyModal
        show={openModalE}
        setShow={setOpenModalE}
        title="Editar  Nuevo Presupuesto"
      >
        <FormPresupuesto
          presupuesto={presuSelected}
          setShow={setOpenModalE}
          getAllPresupuesto={getAllPresupuesto}
        />
      </MyModal>

      {data && data.length === 0 && (
        <div className="flex justify-center mt-8">
          <p className="text-gray-400 border border-gray-400 p-4 rounded-lg">
            NO HAY PRESUPUESTOS
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {data &&
          data.map((c) => (
            <CardPresupuesto
              hadleModalOpen={() => {
                setpresuSelected(c);
                setOpenModalE(true);
              }}
              key={c?.id}
              presupuesto={c}
            />
          ))}
      </div>
    </div>
  );
}
