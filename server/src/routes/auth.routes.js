import { Router } from "express";

import { authUser, authRegister } from "../controllers/AuthController.js";
import { validateToken } from "../utils/authjws.js";
import jwtDecode from "jwt-decode";
const authRouter = Router();
authRouter.post("/login", authUser);
authRouter.post("/register", authRegister);
authRouter.get("/get-user/", validateToken, (req, res) => {
  const token = req.headers[`access-token`];
  try {
    
      const decoded = jwtDecode(token);
      return res.status(200).json(decoded)
  } catch (error) {
    console.log(error);
  }
});

export default authRouter;
