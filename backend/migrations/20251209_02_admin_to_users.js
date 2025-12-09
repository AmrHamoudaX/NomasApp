import { DataTypes } from "sequelize";

const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn("users", "admin", {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  });
};
const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn("users", "admin");
};

export { up, down };
