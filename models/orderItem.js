import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

class OrderItem extends Model { }

OrderItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    { sequelize, underscored: true, timestamps: false, modelName: "orderItem" },
);

export { OrderItem };
