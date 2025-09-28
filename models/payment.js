import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

class Payment extends Model { }

Payment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        payment_method: {
            type: DataTypes.STRING(50),
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(50),
        },
    },
    { sequelize, underscored: true, timestamps: true, modelName: "payment" },
);

export { Payment };
