import axios from "axios";

export const createFacturaService = async (data, token) => {
  return await axios.post(`/facturas`, data, {
    headers: { "access-token": token },
  });
};
export const getAllFacturaService = async (token) => {
  return await axios.get(`/facturas`, {
    headers: { "access-token": token },
  });
};
export const getAllFacturaLastDaysService = async (token) => {
  return await axios.get(`/facturas/last-15-days`, {
    headers: { "access-token": token },
  });
};

export const getFacturasByProyectoService = async (id, token) => {
  return await axios.get(`/proyectos/${id}/facturas`, {
    headers: { "access-token": token },
  });
};
