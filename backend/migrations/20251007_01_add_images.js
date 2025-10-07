import { DataTypes } from "sequelize";

const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable("images", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imagerole: {
      type: DataTypes.ENUM("main", "thumbnail", "gallery"),
      allowNull: false,
    },
    imageurl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  await queryInterface.addColumn("images", "product_id", {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "products", key: "id" },
  });
};

const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("images");
};

export { up, down };
