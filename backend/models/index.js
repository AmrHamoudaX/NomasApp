import { Product } from "./product.js";
import { User } from "./user.js";
import { Category } from "./category.js";
import { Order } from "./order.js";
import { OrderItem } from "./orderItem.js";
import { Payment } from "./payment.js";
import { Image } from "./image.js";

//User relations
User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Payment);
Payment.belongsTo(User);

//Product relations
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

Product.hasMany(Image);
Image.belongsTo(Product);

//Category relations
Category.hasMany(Product);
Product.belongsTo(Category);

//Order relations
Order.hasMany(Payment);
Payment.belongsTo(Order);

Order.hasMany(OrderItem, { as: "items" });
OrderItem.belongsTo(Order);

export { Product, User, Category, Order, OrderItem, Payment, Image };
