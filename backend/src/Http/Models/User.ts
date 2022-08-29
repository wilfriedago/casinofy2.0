import db from "../../Config/database.config";
import Game from "./Game";
import { DataTypes, Model } from "sequelize";

// TODO : Implement password field
interface UserAttributes {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  // password: string;
  phone: string;
  balance: number;
  isConnected: boolean;
}

class User extends Model<UserAttributes> {
  declare id: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUIDV4,
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
      unique: true,
    },
    /** password: {
      type: DataTypes.STRING,
      allowNull: false,
    },*/
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    isConnected: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: "users",
  }
);

// User.hasMany(Game);

export default User;
