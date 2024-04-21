import { DataTypes } from 'sequelize';

export default (sequelize) => {

    sequelize.define(
        "Presupuesto",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            totalCantidad: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            totalAsignado: {
                type: DataTypes.BIGINT,
            },
            totalGasto: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            totalGastoPorcentaje: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            totalRestante: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );

}