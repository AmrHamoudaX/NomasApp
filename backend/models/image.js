import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

class Image extends Model { }

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imageRole: {
      type: DataTypes.ENUM("main", "thumbnail", "gallery"),
      defaultValue: "main",
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "image",
  },
);

export { Image };
