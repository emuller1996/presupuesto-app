import axios from "axios";

const URL_API = "http://localhost:3001";

export const getAllPresupuestosService = async () => {
  try {
    return (await axios.get(`${URL_API}/presupuestos`)).data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createPresupuestoServicio = async (data) => {
  return await axios.post(`${URL_API}/presupuestos`,data)
}

export const updatePresupuestoServicio = async (data) => {
  return await axios.patch(`${URL_API}/presupuestos/${data.id}`,data)
}

export const getProyectoByIdPresupuestoService = async (id) => {
  try {
    const result = await axios.get(
      `http://localhost:3001/presupuestos/${id}/proyectos`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPresupuestobyIdService = async (id) => {
  try {
    const result = await axios.get(`http://localhost:3001/presupuestos/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
