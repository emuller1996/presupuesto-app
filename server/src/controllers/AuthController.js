import { Usuario } from "../db.js";
import jsonwebtoken from "jsonwebtoken";
import jwt_decode from "jwt-decode";

const authUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(req.body);

  var userDb = await Usuario.findOne({
    where: { username: username },
  });
  console.log(userDb?.dataValues);
  if (!userDb) return res.status(403).json({ message: "Usuario  incorrecta." });

  try {
    if (!(await userDb.comparePassword(password))) {
      return res.status(403).json({ message: "Password  incorrecta." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error comparePassword" });
  }

  const userSend = userDb.dataValues;
  delete userSend.password;
  try {
    const accessToken = generateAccessToken(userDb.dataValues);
    return res.header("authorization", accessToken).json({
      message: "USUARIO AUTENTICADO",
      token: accessToken,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error Generando Token" });
  }
};

const generateAccessToken = (user) => {
  return jsonwebtoken.sign(user, process.env.SECRECT_KEY, { expiresIn: "60m" });
};

const authRegister = async (req, res) => {
  const data = req.body;
  try {
    const userCreate = await Usuario.create(data);
    return res
      .status(201)
      .json({ message: "Usuario Creado", user: userCreate });
  } catch (error) {
    console.log(error);
  }
};
export { authUser, authRegister , generateAccessToken};
