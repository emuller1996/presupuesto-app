import axios from "axios";

const URL_API = "http://localhost:3001";

export const getProyectoById = async (id) => {
  try {
    return (await axios.get(`${URL_API}/proyectos/${id}`)).data;
  } catch (error) {}
};

export const getAllcontractosByProyectosService = async (id) => {
  try {
    const result = await axios.get(`${URL_API}/proyectos/${id}/contractos`);
    return result.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const crearContractoProyectosServicio = async (data) => {
  return await axios.post(`${URL_API}/proyectos/${data.proyectosId}/contractos`,data);
};

export const deleteContractoServicio = async (idContracto) => {
  return await axios.delete(`${URL_API}/contractos/${idContracto}`)
}


export const deleteProyectoServicio = async (idProyecto) => {
  return await axios.delete(`${URL_API}/proyectos/${idProyecto}`)
}
