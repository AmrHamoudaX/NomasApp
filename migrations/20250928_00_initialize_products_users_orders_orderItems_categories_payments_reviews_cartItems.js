import { DataTypes } from "sequelize";

const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable("products", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stockquantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  await queryInterface.createTable("users", {
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
    createdat: {
      type: DataTypes.DATE,
    },
    updatedat: {
      type: DataTypes.DATE,
    },
  });
  await queryInterface.createTable("orders", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    totalamount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ),
      defaultValue: "pending",
      allowNull: false,
    },
    createdat: {
      type: DataTypes.DATE,
    },
    updatedat: {
      type: DataTypes.DATE,
    },
  });
  await queryInterface.createTable("categories", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  });
  await queryInterface.createTable("orderitems", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });
  await queryInterface.createTable("cartitems", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  await queryInterface.createTable("reviews", {
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
    createdat: {
      type: DataTypes.DATE,
    },
    updatedat: {
      type: DataTypes.DATE,
    },
  });
  await queryInterface.createTable("payments", {
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
    createdat: {
      type: DataTypes.DATE,
    },
    updatedat: {
      type: DataTypes.DATE,
    },
  });
  await queryInterface.addColumn("orders", "user_id", {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "users", key: "id" },
  });
  await queryInterface.addColumn("cartitems", "user_id", {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "users", key: "id" },
  });
  await queryInterface.addColumn("reviews", "user_id", {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "users", key: "id" },
  });
  await queryInterface.addColumn("payments", "user_id", {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "users", key: "id" },
  });
  await queryInterface.addColumn("orderitems", "product_id", {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "products", key: "id" },
  });
  await queryInterface.addColumn("cartitems", "product_id", {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "products", key: "id" },
  });
  await queryInterface.addColumn("reviews", "product_id", {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "products", key: "id" },
  });
  await queryInterface.addColumn("products", "category_id", {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "categories", key: "id" },
  });
  await queryInterface.addColumn("payments", "order_id", {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "orders", key: "id" },
  });
  await queryInterface.addColumn("orderitems", "order_id", {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "orders", key: "id" },
  });
};

const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("orderitems");
  await queryInterface.dropTable("cartitems");
  await queryInterface.dropTable("reviews");
  await queryInterface.dropTable("payments");
  await queryInterface.dropTable("products");
  await queryInterface.dropTable("categories");
  await queryInterface.dropTable("orders");
  await queryInterface.dropTable("users");
};

export { up, down };
