import { Router } from "express";
import { Order, OrderItem, Product } from "../models/index.js";
import { tokenExtractor } from "../util/middleware.js";

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
router.get("/", async (req, res) => {
  const orderItems = await OrderItem.findAll({
    include: [
      { model: Product, attributes: ["description", "price", "stockquantity"] },
      { model: Order, attributes: ["totalamount", "status"] },
    ],
  });

  res.json(orderItems);
});

//CREATE orderItems
router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const { quantity, productId, orderId } = req.body;
    const order = await Order.findByPk(orderId);
    if (!order || order.userId !== req.decodedToken.id) {
      return res
        .status(404)
        .json({ error: "Order not found or access denied." });
    }
    //Let the hooks do all the work.We just create the item.
    const orderItem = await OrderItem.create({
      quantity,
      productId,
      orderId,
      price: 0,
    });
    res.json(orderItem);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
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
router.put("/:id", orderItemFinder, tokenExtractor, async (req, res) => {
  const orderItem = req.orderitem;
  if (orderItem) {
    orderItem.quantity = req.body.quantity;
    await orderItem.save();
    res.json(orderItem);
  } else {
    res.status(404).end();
  }
});

//DELETE orderItems
router.delete("/:id", orderItemFinder, tokenExtractor, async (req, res) => {
  try {
    const order = await Order.findByPk(req.orderitem.orderId);
    if (req.orderitem && req.decodedToken.id == order.userId) {
      req.orderitem.destroy();
    }
  } catch (error) {
    res.status(204).end();
  }
});

export { router as orderItemRouter };
