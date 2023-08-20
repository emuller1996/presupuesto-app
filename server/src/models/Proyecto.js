const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define(
        "Proyecto",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            montoDisponible: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            montoTotal: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            montoUsado: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );

}