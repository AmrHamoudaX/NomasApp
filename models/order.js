import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

class Order extends Model { }

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        totalamount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(50),
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
