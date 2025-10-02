import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    totalamount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ),
      defaultValue: "pending",
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    createdAt: "createdat",
    updatedAt: "updatedat",
    modelName: "order",
  },
);

export { Order };
