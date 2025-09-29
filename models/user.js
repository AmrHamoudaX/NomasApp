import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        passwordhash: {
            type: DataTypes.STRING(225),
            allowNull: false,
            validate: {
                is: /^.{8,}$/,
            },
        },
        firstname: {
            type: DataTypes.STRING(50),
        },
        lastname: {
            type: DataTypes.STRING(50),
        },
    },
    {
        sequelize,
        underscored: false,
        timestamps: true,
        createdAt: "createdat",
        updatedAt: "updatedat",
        modelName: "user",
    },
);

export { User };
