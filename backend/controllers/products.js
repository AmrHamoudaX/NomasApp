import { Router } from "express";
import { Product, OrderItem, Image, Order } from "../models/index.js";
import { requireAdmin, tokenExtractor } from "../util/middleware.js";

const router = Router();

const productFinder = async (req, res, next) => {
  req.product = await Product.findByPk(req.params.id, {
    include: [
      {
        model: OrderItem,
        attributes: { exclude: ["productId"] },
      },
      {
        model: Image,
        attributes: { exclude: ["productId"] },
      },
    ],
  });
  next();
};

router.get("/", async (req, res) => {
  const products = await Product.findAll({
    include: [
      {
        model: Image,
        attributes: { exclude: ["productId"] },
      },
      {
        model: OrderItem,
        attributes: { exclude: ["productId"] },
      },
    ],
  });
  res.json(products);
});

router.post("/", tokenExtractor, requireAdmin, async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", productFinder, async (req, res) => {
  if (req.product) {
    res.json(req.product);
  } else {
    res.status(404).end();
  }
});

router.delete(
  "/:id",
  productFinder,
  tokenExtractor,
  requireAdmin,
  async (req, res) => {
    try {
      if (!req.product) {
        return res.status(404).json({ error: "Product not found" });
      }
      //Delete all associated images if any
      const images = await Image.findAll({
        where: { productId: req.product.id },
      });
      for (const image of images) {
        await image.destroy();
      }
      //Delete all associate orderItems if any
      const orderItems = await OrderItem.findAll({
        where: { productId: req.product.id },
      });
      for (const orderItem of orderItems) {
        await orderItem.destroy();
      }
      //Delete the product
      await req.product.destroy();
      res.status(204).end();
    } catch (error) {
      console.log(req.product);
      res.status(500).json({ error: "Failed to delete product" });
    }
  },
);

export { router as productRouter };
