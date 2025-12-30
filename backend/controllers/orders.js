import { Router } from "express";
import { Order, Payment, OrderItem, User, Product } from "../models/index.js";
import { requireAdmin, tokenExtractor } from "../util/middleware.js";

const router = Router();

const orderFinder = async (req, res, next) => {
  (req.order = await Order.findByPk(req.params.id, {
    include: [
      {
        model: OrderItem,
        include: [Product],
        attributes: { exclude: ["order_id"] },
      },
    ],
  })),
    next();
};

//GET all orders
router.get("/", tokenExtractor, requireAdmin, async (req, res) => {
  const orders = await Order.findAll({
    include: [
      { model: User, attributes: ["email", "username"] },
      {
        model: OrderItem,
        attributes: { exclude: ["order_id"] },
      },
      {
        model: Payment,
        attributes: { exclude: ["order_id"] },
      },
    ],
  });
  res.json(orders);
});

//CREATE orders
router.post("/", async (req, res, next) => {
  try {
    //Note: totalAmount is NOT passed here
    const order = await Order.create({});
    res.json(order);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

//GET orders by id for users
router.get("/:id", orderFinder, async (req, res) => {
  if (!req.order) return res.status(404).end();
  if (req.order.status !== "pending") {
    return res.status(403).end();
  }
  res.json(req.order);
});

//GET orders by id for admin
router.get(
  "/admin/:id",
  orderFinder,
  tokenExtractor,
  requireAdmin,
  async (req, res) => {
    if (req.order) {
      res.json(req.order);
    } else {
      res.status(404).end();
    }
  },
);

//UPDATE orders by id
router.put("/:id", orderFinder, tokenExtractor, async (req, res) => {
  const order = req.order;
  if (order && order.userId === req.decodedToken.id) {
    order.status = req.body.status;
    await order.save();
    res.json(order);
  } else {
    res.status(404).end();
  }
});

export { router as orderRouter };
