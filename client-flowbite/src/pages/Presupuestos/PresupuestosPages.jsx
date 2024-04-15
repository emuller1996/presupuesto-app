import { useEffect, useState } from "react";
import { usePresupuesto } from "../../hooks/usePresupuesto";
import CardPresupuesto from "./components/CardPresupuesto";
import FormPresupuesto from "./components/FormPresupuesto";
import MyModal from "../../components/_Modal";
export default function PresupuestosPages() {
  const { data, getAllPresupuesto } = usePresupuesto();
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    getAllPresupuesto();
  }, []);

  return (
    <div>
      <div className="mb-2">
        <button
          onClick={() => setOpenModal(true)}
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Agregar Presupuesto
        </button>
      </div>

      <MyModal
        show={openModal}
        setShow={setOpenModal}
        title="Crear Nuevo Presupuesto"
      >
        <FormPresupuesto getAllPresupuesto={getAllPresupuesto} />
      </MyModal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {data &&
          data.map((c) => <CardPresupuesto key={c?.id} presupuesto={c} />)}
      </div>
    </div>
  );
}
