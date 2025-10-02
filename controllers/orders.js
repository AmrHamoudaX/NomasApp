import { Router } from "express";
import { Order, Payment, OrderItem, User } from "../models/index.js";
import { tokenExtractor } from "../util/middleware.js";

const router = Router();

const orderFinder = async (req, res, next) => {
  (req.order = await Order.findByPk(req.params.id, {
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
  })),
    next();
};

//GET all orders
router.get("/", async (req, res) => {
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
router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    //Note: totalAmount is NOT passed here
    const order = await Order.create({
      userId: user.id,
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

//GET orders by id
router.get("/:id", orderFinder, async (req, res) => {
  if (req.order) {
    res.json(req.order);
  } else {
    res.status(404).end();
  }
});

//UPDATE orders by id
router.put("/:id", orderFinder, tokenExtractor, async (req, res) => {
  const order = req.order;
  if (order) {
    order.status = req.body.status;
    await order.save();
    res.json(order);
  } else {
    res.status(404).end();
  }
});

//DELETE orders
router.delete("/:id", orderFinder, tokenExtractor, async (req, res) => {
  if (req.order && req.decodedToken.id === req.order.userId) {
    await req.order.destroy();
  }
  res.status(204).end();
});

export { router as orderRouter };
