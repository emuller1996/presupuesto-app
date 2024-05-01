import { useContext, useState } from "react";
import {
  getAllPresupuestosService,
  getPresupuestobyIdService,
  getProyectoByIdPresupuestoService,
} from "../services/presupuesto.servicios";
import AuthContext from "../context/AuthContext";
export const usePresupuesto = () => {
  const [data, setData] = useState([]);
  const [dataDetail, setDataDetail] = useState({});
  const [Proyectos, setProyectos] = useState(null);
  const { token } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const abortController = new AbortController();
  const signal = abortController.signal;

  const getAllPresupuesto = async () => {
    setLoading(true);
    try {
      const res = await getAllPresupuestosService(token);
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

  const getPresupuestoById = async (id) => {
    setLoading(true);

    try {
      setDataDetail(null);
      const result = await getPresupuestobyIdService(id, token);
      console.log();
      setDataDetail(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getProyectosByPresupuesto = async (idPresupuesto) => {
    setLoading(true);

    try {
      setDataDetail(null);
      const result = await getProyectoByIdPresupuestoService(
        idPresupuesto,
        token
      );
      console.log();
      setProyectos(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    getAllPresupuesto,
    getPresupuestoById,
    getProyectosByPresupuesto,
    dataDetail,
    Proyectos,
  };
};
