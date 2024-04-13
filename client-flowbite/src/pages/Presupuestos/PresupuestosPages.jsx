import { useEffect } from "react";
import { usePresupuesto } from "../../hooks/usePresupuesto";
import CardPresupuesto from "./components/CardPresupuesto";

export default function PresupuestosPages() {
  const { data, getAllPresupuesto } = usePresupuesto();

  useEffect(() => {
    getAllPresupuesto();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {data && data.map((c) => <CardPresupuesto key={c} presupuesto={c} />)}
      </div>
    </div>
  );
}
