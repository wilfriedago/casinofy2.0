import { DataTypes, Model } from "sequelize";
import db from "../../Config/database.config";
import User from "./User";

interface GameAttributes {
  id: string;
  userId: string;
  bet: number;
  gain: number;
  status: string;
  ringSpeed: number;
  digitNumber: number;
  targetNumber: number;
  isLiveGame: boolean;
}

class Game extends Model<GameAttributes> {}

Game.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUIDV4,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
    bet: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    gain: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ringSpeed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    digitNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    targetNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isLiveGame: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: "games",
  }
);

export default Game;
