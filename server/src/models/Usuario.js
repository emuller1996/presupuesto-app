import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "Usuario",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
};
