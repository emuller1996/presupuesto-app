import axios from "axios";

export const getAllPresupuestosService = async (token) => {
  try {
    return await axios.get(`/presupuestos`, {
      headers: { "access-token": token },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createPresupuestoServicio = async (data, token) => {
  return await axios.post(`/presupuestos`, data, {
    headers: { "access-token": token },
  });
};

export const updatePresupuestoServicio = async (data, token) => {
  return await axios.patch(`/presupuestos/${data.id}`, data, {
    headers: { "access-token": token },
  });
};

export const getProyectoByIdPresupuestoService = async (id, token) => {
  try {
    const result = await axios.get(`/presupuestos/${id}/proyectos`, {
      headers: { "access-token": token },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getPresupuestobyIdService = async (id, token) => {
  try {
    const result = await axios.get(`/presupuestos/${id}`, {
      headers: { "access-token": token },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
