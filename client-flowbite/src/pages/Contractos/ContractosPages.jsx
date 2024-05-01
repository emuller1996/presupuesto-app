import { useEffect } from "react";
import { useContracto } from "../../hooks/useContracto";
import CardContractos from "../ProyectoDetalle/components/CardContractos";
export default function ContractosPages() {
  const { data, getAllContracto } = useContracto();

  useEffect(() => {
    getAllContracto();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {data && data.map((c) => <CardContractos key={c?.id} contracto={c} />)}
      </div>
    </div>
  );
}
