import axios from "axios";


export const getProyectoById = async (id) => {
  try {
    return (await axios.get(`/proyectos/${id}`)).data;
  } catch (error) {}
};

export const getAllcontractosByProyectosService = async (id) => {
  try {
    const result = await axios.get(`/proyectos/${id}/contractos`);
    return result.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const crearContractoProyectosServicio = async (data) => {
  return await axios.post(`/proyectos/${data.ProyectoId}/contractos`,data);
};

export const deleteContractoServicio = async (idContracto) => {
  return await axios.delete(`/contractos/${idContracto}`)
}


export const deleteProyectoServicio = async (idProyecto) => {
  return await axios.delete(`/proyectos/${idProyecto}`)
}
