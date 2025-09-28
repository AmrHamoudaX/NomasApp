import { Product } from "./product.js";
import { User } from "./user.js";
import { CartItem } from "./cartItem.js";
import { Category } from "./category.js";
import { Order } from "./order.js";
import { OrderItem } from "./orderItem.js";
import { Review } from "./review.js";
import { Payment } from "./payment.js";
import { sequelize } from "../util/db.js";

//User relations
User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(CartItem);
CartItem.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

User.hasMany(Payment);
Payment.belongsTo(User);

//Product relations
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

Product.hasMany(Review);
Review.belongsTo(Product);

//Category relations
Category.hasMany(Product);
Product.belongsTo(Category);

//Order relations
Order.hasMany(Payment);
Payment.belongsTo(Order);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

//Many-to-Many Relations
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

User.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(User, { through: CartItem });

await sequelize.sync({ alter: true });
console.log("All models were synchronized successfully.");

export { Product, User, CartItem, Category, Order, OrderItem, Review, Payment };
