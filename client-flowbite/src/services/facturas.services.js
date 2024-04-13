import axios from "axios";


export const createFacturaService = async (data) => {
    return await axios.post(`/facturas`,data)
};

export const getFacturasByProyectoService = async ( id ) => {

    return await axios.get(`/proyectos/${id}/facturas`)
}