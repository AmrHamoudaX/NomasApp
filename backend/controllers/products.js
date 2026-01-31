import { Router } from "express";
import { Product, OrderItem, Image, Order } from "../models/index.js";
import { requireAdmin, tokenExtractor } from "../util/middleware.js";
import { supabase } from "../util/supabase.js";
import { redis } from "../util/redis.js";

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

//Get All Products
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

// -------Admin Chooses Featured Products------------
router.put(
  "/featured",
  tokenExtractor,
  requireAdmin,
  async (req, res, next) => {
    try {
      const { productIds } = req.body;

      if (!Array.isArray(productIds)) {
        return res.status(400).json({ error: "productIds must be an array" });
      }

      if (productIds.length > 12) {
        return res.status(400).json({ error: "Too many featured products" });
      }

      //atomic replace
      await redis
        .multi()
        .del("homepage:featured")
        // productIds Must be a String
        .rPush("homepage:featured", productIds)
        .exec();

      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to save feature products" });
    }
  },
);

// Get Featured Products
router.get("/featured", async (req, res) => {
  try {
    const ids = await redis.lRange("homepage:featured", 0, -1);
    console.log(ids);
    if (!ids.length) {
      return res.json([]);
    }

    const featuredProducts = await Product.findAll({
      where: {
        id: ids,
      },
    });
    const featuredProductIds = Object.values(featuredProducts).map(
      // Turn to String!!!
      (product) => `${product.id}`,
    );

    console.log(featuredProductIds);
    res.json(featuredProductIds);
  } catch (err) {
    console.error(err);
  }
});

// Delete FeaturedProduct Id
router.delete(
  "/featured/:id",
  tokenExtractor,
  requireAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      //Remove ID from Redis List
      const removedCount = await redis.lRem(
        "homepage:featured",
        0,
        id.toString(),
      );
      if (removedCount === 0) {
        return res.status(400).json({ error: "Product not featured" });
      }
      res.json({
        message: `Featured product removed successfully`,
        productId: id,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
);
//--------End Featured Products-------

router.get("/:id", productFinder, async (req, res) => {
  if (req.product) {
    res.json(req.product);
  } else {
    res.status(404).end();
  }
});

//Delete product and all assosications and image from supabase
const getImagePathFromUrl = (url) => {
  const parts = url.split("/storage/v1/object/public/images/");
  return parts[1];
};
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
        const path = getImagePathFromUrl(image.imageUrl);

        const { error } = await supabase.storage.from("images").remove([path]);

        if (error) {
          console.error("Supabase delete error:", error);
        }

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
      console.error(error.message);
      res.status(500).json({ error: "Failed to delete product" });
    }
  },
);

export { router as productRouter };
