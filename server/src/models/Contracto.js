import { DataTypes } from 'sequelize';

export default (sequelize) => {

    sequelize.define(
        "Contracto",
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
            monto_total: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            monto_disponible: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            monto_usado: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            fecha_creado: {
                type: DataTypes.DATE,
                allowNull: false,
            }
        },
        {
            timestamps: false,
        }
    );

}