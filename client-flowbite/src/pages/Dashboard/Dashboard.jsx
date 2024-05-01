import { useEffect } from "react";
import { usePresupuesto } from "../../hooks/usePresupuesto";
import CharFacturas15Days from "./components/CharFacturas15Days";
import { useProyecto } from "../../hooks/useProyecto";
import { useContracto } from "../../hooks/useContracto";

export default function Dasboard() {
  const { data: presupuestoData, getAllPresupuesto } = usePresupuesto();
  const { data: proyectosData, getAllProyectos } = useProyecto();
  const { data: ContractoData, getAllContracto } = useContracto();

  useEffect(() => {
    getAllPresupuesto();
    getAllProyectos();
    getAllContracto();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="grid md:grid-cols-3 mb-2 gap-2">
        <div className="text-white uppercase bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-lg  px-5 py-2.5 text-center me-2 mb-2">
          <p className="font-bold uppercase">Total Presupuestos</p>
          <p className="font-bold uppercase ">{presupuestoData?.length}</p>
        </div>

        <div className="text-white uppercase bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-semibold rounded-lg  px-5 py-2.5 text-center me-2 mb-2">
          <p className="font-bold uppercase">Total Proyectos</p>
          <p className="font-bold uppercase ">{proyectosData?.length}</p>
        </div>

        <div className="text-white bg-gradient-to-br from-purple-500 to-purple-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-semibold uppercase rounded-lg  px-5 py-2.5 text-center me-2 mb-2">
          <p className="font-bold uppercase">Total Contractos</p>
          <p className="font-bold uppercase ">{ContractoData?.length}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2">
        <div className="border rounded-lg border-green-300 p-2">
          <p className="mb-3 text-center text-green-800 uppercase font-semibold">
            Facturas de los Ultimos 15 Dias
          </p>
          <div>
            <CharFacturas15Days />
          </div>
        </div>
      </div>
    </div>
  );
}
