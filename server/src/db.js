const { Sequelize } = require("sequelize");
const modeloPresupuesto = require("./models/Presupuesto.js");
const modeloProyecto = require("./models/Proyecto.js");



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



const {
    Presupuesto,
    Proyecto
} = sequelize.models;


Presupuesto.hasMany(Proyecto)
Proyecto.belongsTo(Presupuesto)

module.exports = {
    Presupuesto,
    Proyecto,
    db: sequelize,
};