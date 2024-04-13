import { useEffect, useState } from "react";
import { usePresupuesto } from "../../hooks/usePresupuesto";
import CardPresupuesto from "./components/CardPresupuesto";
import FormPresupuesto from "./components/FormPresupuesto";
import {  Modal } from "flowbite-react";
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
          className="px-4 py-2 rounded-md text-sky-100 bg-sky-700 border-2 border-sky-300 hover:bg-sky-600 hover:border-sky-400 focus:border-sky-700"
        >
          Agregar Presupuesto
        </button>
      </div>
      <Modal
        
        className=" flex flex-col"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header className="bg-blue-200 px-4 py-2 text-white rounded-t-lg ">
          Crear Nuevo Presupuesto
        </Modal.Header>
        <Modal.Body className="bg-blue-50 p-6 rounded-b-lg">
          <div className="space-y-6">
            <div>
              <FormPresupuesto getAllPresupuesto={getAllPresupuesto} />
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {data && data.map((c) => <CardPresupuesto key={c} presupuesto={c} />)}
      </div>
    </div>
  );
}
