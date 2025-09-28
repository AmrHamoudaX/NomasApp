import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

class Review extends Model { }

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        comment: {
            type: DataTypes.TEXT,
        },
    },
    { sequelize, underscored: true, timestamps: true, modelName: "review" },
);

export { Review };
