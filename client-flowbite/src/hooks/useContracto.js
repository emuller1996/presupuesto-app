import { useContext, useState } from "react";
import { getAllContractosService } from "../services/contractos.services";
import AuthContext from "../context/AuthContext";
export const useContracto = () => {
  const [data, setData] = useState([]);
  const { token } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const abortController = new AbortController();
  const signal = abortController.signal;

  const getAllContracto = async () => {
    setLoading(true);
    try {
      const res = await getAllContractosService(token);
      if (res.status !== 200) {
        let err = new Error("Error en la petición Fetch");
        err.status = res.status || "00";
        err.statusText = res.statusText || "Ocurrió un error";
        throw err;
      }
      console.log(res);

      if (!signal.aborted) {
        setData(res.data);
        setError(null);
      }
    } catch (error) {
      if (!signal.aborted) {
        setData(null);
        setError(error);
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  };

  return {
    data,
    error,
    loading,
    getAllContracto,
  };
};
