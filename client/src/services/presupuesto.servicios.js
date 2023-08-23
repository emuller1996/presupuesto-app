import axios from "axios";


export const getAllPresupuestosService = async () => {
  try {
    return (await axios.get(`/presupuestos`)).data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createPresupuestoServicio = async (data) => {
  return await axios.post(`/presupuestos`,data)
}

export const updatePresupuestoServicio = async (data) => {
  return await axios.patch(`/presupuestos/${data.id}`,data)
}

export const getProyectoByIdPresupuestoService = async (id) => {
  try {
    const result = await axios.get(
      `/presupuestos/${id}/proyectos`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPresupuestobyIdService = async (id) => {
  try {
    const result = await axios.get(`/presupuestos/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
