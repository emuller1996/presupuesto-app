import axios from "axios";

export const getAllProyectoService = async (token) => {
  try {
    return await axios.get(`/proyectos/`, {
      headers: { "access-token": token },
    });
  } catch (error) {
    console.log(error);
  }
};
export const getProyectoById = async (id, token) => {
  try {
    return await axios.get(`/proyectos/${id}`, {
      headers: { "access-token": token },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllcontractosByProyectosService = async (id, token) => {
  try {
    const result = await axios.get(`/proyectos/${id}/contractos`, {
      headers: { "access-token": token },
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const crearContractoProyectosServicio = async (data, token) => {
  return await axios.post(`/proyectos/${data.ProyectoId}/contractos`, data, {
    headers: { "access-token": token },
  });
};

export const deleteContractoServicio = async (idContracto) => {
  return await axios.delete(`/contractos/${idContracto}`);
};

export const deleteProyectoServicio = async (idProyecto) => {
  return await axios.delete(`/proyectos/${idProyecto}`);
};
