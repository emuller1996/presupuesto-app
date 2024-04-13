import { useParams } from "react-router-dom";
import { usePresupuesto } from "../../hooks/usePresupuesto";
import { useEffect } from "react";
import CardPresupuesto from "../Presupuestos/components/CardPresupuesto";
import CardProyecto from "../Proyectos/components/CardProyecto";

export default function PresupuestoDetalle() {
  const { idPresupuesto } = useParams();
  const {
    dataDetail,
    Proyectos,
    getPresupuestoById,
    getProyectosByPresupuesto,
  } = usePresupuesto();

  useEffect(() => {
    getPresupuestoById(idPresupuesto);
    getProyectosByPresupuesto(idPresupuesto);
  }, [idPresupuesto]);

  return (
    <div>
      {dataDetail && <CardPresupuesto presupuesto={dataDetail} />}
      <hr className="my-4 border" />
      <div className="">
        <button
          type="button"
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
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
            <>
              <CardProyecto proyecto={p} />
            </>
          ))}
      </div>
      
    </div>
  );
}