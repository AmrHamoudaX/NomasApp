import { Router } from "express";
import { Order, OrderItem, Product } from "../models/index.js";
import { requireAdmin, tokenExtractor } from "../util/middleware.js";

const router = Router();

const orderItemFinder = async (req, res, next) => {
  (req.orderitem = await OrderItem.findByPk(req.params.id, {
    include: [
      { model: Product, attributes: ["description", "price", "stockquantity"] },
      { model: Order, attributes: ["totalamount", "status"] },
    ],
  })),
    next();
};

//GET all orderItems
router.get("/", tokenExtractor, requireAdmin, async (req, res) => {
  const orderItems = await OrderItem.findAll({
    include: [
      { model: Product, attributes: ["description", "price", "stockquantity"] },
      { model: Order, attributes: ["totalamount", "status"] },
    ],
  });

  res.json(orderItems);
});

//GET orderItems by id
router.get("/:id", orderItemFinder, async (req, res) => {
  if (req.orderitem) {
    res.json(req.orderitem);
  } else {
    res.status(404).end();
  }
});

//UPDATE orderItems by id
router.put("/:id", orderItemFinder, async (req, res) => {
  const orderItem = req.orderitem;
  if (orderItem) {
    if (orderItem.Order.status !== "pending") {
      return res.status(400).json({ error: "Order is not editable" });
    }
    orderItem.quantity = req.body.quantity;
    await orderItem.save();
    res.json(orderItem);
  } else {
    res.status(404).end();
  }
});

//DELETE orderItems
router.delete("/:id", orderItemFinder, async (req, res) => {
  console.log(req.orderitem);
  if (req.orderitem) {
    if (req.orderitem.Order.status !== "pending") {
      return res.status(400).json({ error: "Order is not editable" });
    }
    await req.orderitem.destroy();
  }
  res.status(204).end();
});

export { router as orderItemRouter };
