const { Sequelize } = require("sequelize");
const modeloPresupuesto = require("./models/Presupuesto.js");
const modeloProyecto = require("./models/Proyecto.js");
const modeloContracto = require("./models/Contracto.js");
const modeloFactura = require("./models/Factura.js");





require("dotenv").config();

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



const {
    Presupuesto,
    Proyecto,
    Contracto,
    Factura
} = sequelize.models;


Presupuesto.hasMany(Proyecto)
Proyecto.belongsTo(Presupuesto)

Proyecto.hasMany(Contracto)
Contracto.belongsTo(Proyecto)

Contracto.hasMany(Factura)
Factura.belongsTo(Contracto)


module.exports = {
    Presupuesto,
    Proyecto,
    Contracto,
    Factura,
    db: sequelize,
};