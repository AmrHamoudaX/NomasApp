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
        paymentmethod: {
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
    {
        sequelize,
        underscored: true,
        timestamps: true,
        createdAt: "createdat",
        updatedAt: "updatedat",
        modelName: "payment",
    },
);

export { Payment };
