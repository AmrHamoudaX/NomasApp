import { Router } from "express";
import { Product, OrderItem, CartItem, Review } from "../models/index.js";

const router = Router();

const productFinder = async (req, res, next) => {
  req.product = await Product.findByPk(req.params.id, {
    include: [
      {
        model: OrderItem,
        attributes: { exclude: ["product_id"] },
      },
      {
        model: CartItem,
        attributes: { exclude: ["product_id"] },
      },
      {
        model: Review,
        attributes: { exclude: ["product_id"] },
      },
    ],
  });
  next();
};

router.get("/", async (req, res) => {
  const products = await Product.findAll({
    include: [
      {
        model: OrderItem,
        attributes: { exclude: ["product_id"] },
      },
      {
        model: CartItem,
        attributes: { exclude: ["product_id"] },
      },
      {
        model: Review,
        attributes: { exclude: ["product_id"] },
      },
    ],
  });
  res.json(products);
});

router.post("/", async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    next(error.message);
  }
});

router.get("/:id", productFinder, async (req, res) => {
  if (req.product) {
    res.json(req.product);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", productFinder, async (req, res) => {
  if (req.product) {
    await req.product.destroy();
  }
  res.status(204).end();
});

export { router as productRouter };
