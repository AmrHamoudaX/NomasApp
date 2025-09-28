import { Product } from "./product.js";
import { User } from "./user.js";
import { CartItem } from "./cartItem.js";
import { Category } from "./category.js";
import { Order } from "./order.js";
import { OrderItem } from "./orderItem.js";
import { Review } from "./review.js";
import { Payment } from "./payment.js";

Product.sync({ alter: true });
User.sync({ alter: true });
CartItem.sync({ alter: true });
Category.sync({ alter: true });
Order.sync({ alter: true });
OrderItem.sync({ alter: true });
Review.sync({ alter: true });
Payment.sync({ alter: true });

export { Product, User, CartItem, Category, Order, OrderItem, Review, Payment };
