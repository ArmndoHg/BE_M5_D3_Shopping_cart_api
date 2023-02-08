import { DataTypes } from "sequelize";
import sequelize from "../../db.js";
import ReviewsModel from "../reviews/model.js";

const UsersModel = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
  /* {timestamps: false} TIMESTAMPS HERE ARE TRUE BY DEFAULT */
);

// 1 to many relationship
UsersModel.hasMany(ReviewsModel, { foreignKey: { allowNull: false } });
ReviewsModel.belongsTo(UsersModel);

export default UsersModel;
