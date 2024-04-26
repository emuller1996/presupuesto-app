import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "Proyecto",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
      montoAsignado: {
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
};
