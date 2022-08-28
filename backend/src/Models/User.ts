import { DataTypes, Model } from "sequelize/types";
import db from "../config/database.config";

interface UserAttributes {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  balance: number;
  isConnected: boolean;
}

class User extends Model<UserAttributes> {}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    isConnected: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "users",
  }
);
