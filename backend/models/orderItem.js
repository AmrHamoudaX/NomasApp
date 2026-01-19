import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";
import { Product } from "./index.js";

class OrderItem extends Model { }

// IMPORTANT:
// OrderItem must ONLY be created: 1) inside a Sequelize transaction
// 2) after Stripe payment confirmation (via webhook)
// Creating OrderItems elsewhere can cause double stock deduction
// and inconsistent orders.

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1, // Quantity should be at least 1
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "order_item",
    hooks: {
      //Purpose: Validate stock, and set the correct price
      beforeCreate: async (orderItem, options) => {
        const product = await Product.findByPk(orderItem.productId, {
          transaction: options.transaction,
          lock: options.transaction
            ? options.transaction.LOCK.UPDATE
            : undefined,
        });

        if (!product) {
          throw new Error("Product not found.");
        }

        //Option to stop if stock is insufficient
        if (product.stockQuantity < orderItem.quantity) {
          throw new Error("Insufficient stock quantity");
        }
        //Set the price automatically from the product
        orderItem.price = Number(product.price);
      },
      //Purpose: Update the product's stock and the order's total amount
      afterCreate: async (orderItem, options) => {
        const product = await Product.findByPk(orderItem.productId, {
          transaction: options.transaction,
          lock: options.transaction
            ? options.transaction.LOCK.UPDATE
            : undefined,
        });
        product.stockQuantity -= orderItem.quantity;
        await product.save({ transaction: options.transaction });
      },
    },
  },
);

export { OrderItem };
