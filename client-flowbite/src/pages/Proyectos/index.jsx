import { useEffect } from "react";
import { useProyecto } from "../../hooks/useProyecto";
import CardProyecto from "./components/CardProyecto";

export default function ProyectosPages() {
  const { data, getAllProyectos } = useProyecto();

  useEffect(() => {
    getAllProyectos();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        
        {data && data.map((c) => <CardProyecto key={c} proyecto={c} />)}
      </div>
    </div>
  );
}
