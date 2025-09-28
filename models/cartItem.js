import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

class CartItem extends Model { }

CartItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "user", key: "id" },
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "product", key: "id" },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    { sequelize, underscored: true, timestamps: false, modelName: "cartItem" },
);

export { CartItem };
