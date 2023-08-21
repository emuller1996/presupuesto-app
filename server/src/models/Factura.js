const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define(
        "Factura",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            montoTotal: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            estado: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            fechaPagado: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            concepto: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );

}