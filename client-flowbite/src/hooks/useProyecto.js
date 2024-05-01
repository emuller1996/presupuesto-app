import { useContext, useState } from "react";
import {
  getAllProyectoService,
  getAllcontractosByProyectosService,
  getProyectoById,
} from "../services/proyectos.servicios";
import { getFacturasByProyectoService } from "../services/facturas.services";
import AuthContext from "../context/AuthContext";
export const useProyecto = () => {
  const [data, setData] = useState([]);
  const [dataDetail, setDataDetail] = useState(null);
  const [Contractos, setContractos] = useState(null);
  const [Facturas, setFacturas] = useState(null);
  const { token } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const abortController = new AbortController();
  const signal = abortController.signal;

  const getAllProyectos = async () => {
    setLoading(true);
    try {
      const res = await getAllProyectoService(token);
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

  const getProyectosById = async (id) => {
    setLoading(true);
    try {
      setDataDetail(null);
      const result = await getProyectoById(id,token);
      setDataDetail(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getContractosByProyecto = async (id) => {
    setLoading(true);
    try {
      const result = await getAllcontractosByProyectosService(id,token);
      console.log();
      setContractos(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const getFacturasByProyecto = async (id) => {
    setLoading(true);
    try {
      const result = await getFacturasByProyectoService(id,token);
      console.log();
      setFacturas(result.data);
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
    getAllProyectos,
    getProyectosById,
    dataDetail,
    getContractosByProyecto,
    Contractos,
    getFacturasByProyecto,
    Facturas,
  };
};
