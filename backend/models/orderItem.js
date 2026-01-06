import { Model, DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";
import { Order, Product } from "./index.js";

class OrderItem extends Model { }

//Updates the parent Order's totalAmount
const updateOrderTotal = async (orderItem) => {
  const order = await Order.findByPk(orderItem.orderId);
  if (order) {
    //ModelName: "orderitem" Sequelize pluralizes it -> order.getOrderitems()
    const items = await order.getItems();
    const total = items.reduce((sum, item) => {
      //Ensure price and quantity are numbers before calculation
      return sum + Number(item.price) * Number(item.quantity);
    }, 0);
    order.totalAmount = total;
    await order.save();
  }
};

//Updates the Product's stock quantity
const updateProductStock = async (orderItem, operation) => {
  const product = await Product.findByPk(orderItem.productId);
  if (product) {
    if (operation === "increment") {
      product.stockQuantity += orderItem.quantity;
    } else if (operation === "decrement") {
      product.stockQuantity -= orderItem.quantity;
    }
    await product.save();
  }
};

// --- Model Definition ---
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
      beforeCreate: async (orderitem) => {
        const product = await Product.findByPk(orderitem.productId);
        if (!product) {
          throw new Error("Product not found.");
        }
        //Option to stop if stock is insufficient
        if (product.stockQuantity < orderitem.quantity) {
          throw new Error("Insufficient stock quantity");
        }
        //Set the price automatically from the product
        orderitem.price = Number(product.price);
      },
      //Purpose: Update the product's stock and the order's total amount
      afterCreate: async (orderItem) => {
        await updateProductStock(orderItem, "decrement");
        await updateOrderTotal(orderItem);
      },
      //Purpose: Restore the product's stock and update the order's total amount
      afterDestroy: async (orderItem) => {
        await updateProductStock(orderItem, "increment");
        await updateOrderTotal(orderItem);
      },
      //Purpose: Adjust stock based on the change in qunatity
      beforeUpdate: async (orderItem) => {
        if (orderItem.changed("quantity")) {
          const oldQuantity = orderItem.previous("quantity");
          const newQuantity = orderItem.quantity;
          const quantityDiff = newQuantity - oldQuantity;
          const product = await Product.findByPk(orderItem.productId);
          if (!product) {
            throw new Error("Product not found.");
          }
          //Check if there is enough stock for the increase in quantity
          if (quantityDiff > 0 && product.stockQuantity < quantityDiff) {
            throw new Error("Insufficient stock to increase quantity.");
          }
          //Adjust stock: decrement if quantity increased, increment if it decreased
          product.stockQuantity -= quantityDiff;
          await product.save();
        }
      },
      //Purpose: Update the order's total amount if quantity or price changed.
      afterUpdate: async (orderItem) => {
        if (orderItem.changed("quantity") || orderItem.changed("price")) {
          await updateOrderTotal(orderItem);
        }
      },
    },
  },
);

export { OrderItem };
