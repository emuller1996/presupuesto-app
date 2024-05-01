import axios from "axios";

export const getAllContractosService = async (token) => {
  try {
    return await axios.get(`/contractos`, {
      headers: { "access-token": token },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};
