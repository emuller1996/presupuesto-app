import axios from "axios";

const URL_API = "http://localhost:3001";

export const createFacturaService = async (data) => {
    return await axios.post(`${URL_API}/facturas`,data)
};

export const getFacturasByProyectoService = async ( id ) => {

    return await axios.get(`${URL_API}/proyectos/${id}/facturas`)
}