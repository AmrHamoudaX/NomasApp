import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

class Category extends Model { }

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    { sequelize, underscored: true, timestamps: false, modelName: "category" },
);

export { Category };
