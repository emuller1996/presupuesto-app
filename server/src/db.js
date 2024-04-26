import { Sequelize } from "sequelize";
import modeloPresupuesto from "./models/Presupuesto.js";
import modeloProyecto from "./models/Proyecto.js";
import modeloContracto from "./models/Contracto.js";
import modeloFactura from "./models/Factura.js";
import modelUser from "./models/Usuario.js";

import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

// postgresql://${{ DB_USER }}:${{ DB_PASSWORD }}@${{ DB_HOST }}:${{ DB_PORT }}/${{ DB_NAME }}
const sequelize = new Sequelize(
  `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

modeloPresupuesto(sequelize);
modeloProyecto(sequelize);
modeloContracto(sequelize);
modeloFactura(sequelize);
modelUser(sequelize);

const { Presupuesto, Proyecto, Contracto, Factura, Usuario } = sequelize.models;

Usuario.beforeCreate(async (user) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
});

Usuario.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

Usuario.hasMany(Presupuesto);
Presupuesto.belongsTo(Usuario);

Presupuesto.hasMany(Proyecto);
Proyecto.belongsTo(Presupuesto);

Proyecto.hasMany(Contracto);
Contracto.belongsTo(Proyecto);

Contracto.hasMany(Factura);
Factura.belongsTo(Contracto);

export { Presupuesto, Proyecto, Contracto, Factura, Usuario, sequelize as db };
