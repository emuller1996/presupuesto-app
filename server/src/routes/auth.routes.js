import { Router } from "express";


import {
  authUser,
  authRegister,
  generateAccessToken,
} from "../controllers/AuthController.js";
import { validateToken } from "../utils/authjws.js";
import jwtDecode from "jwt-decode";
import passport from "passport";
import { Usuario } from "../db.js";

const authRouter = Router();
authRouter.post("/login", authUser);
authRouter.get(
  "/login-github",
  passport.authenticate("git-hub", {
    scope: ["user:email"],
    session: false,
  })
);

authRouter.get(
  "/login-github/callback",
  passport.authenticate("git-hub", {
    scope: ["user:email"],
    session: false,
  }),
  async (req, res) => {
    try {
      const usuario = await Usuario.findOrCreate({
        where: { username: req.user.username },
        defaults: {
          username: req.user.username,
          nombre: req.user.displayName,
          email: req.user.email,
          password: "",
          img_url: req.user?.photos[0]?.value,
        },
      });
      const accessToken = generateAccessToken(usuario[0].dataValues);
      const user = JSON.stringify(accessToken);
      res.status(200).send(`<!DOCTYPE html>
    <html lang="en">
      <body>
      </body>
      <script>
        window.opener.postMessage(${user}, 'http://localhost:5173')
      </script>
    </html>`);
      /* return res.status(200).header("authorization", accessToken).json({
        message: "USUARIO AUTENTICADO",
        token: accessToken,
      }); */
    } catch (error) {
      console.log(error);
    }
  }
);
authRouter.post("/register", authRegister);
authRouter.get("/get-user/", validateToken, (req, res) => {
  const token = req.headers[`access-token`];
  try {
    const decoded = jwtDecode(token);
    return res.status(200).json(decoded);
  } catch (error) {
    console.log(error);
  }
});

export default authRouter;
