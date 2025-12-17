import { Router } from "express";
import { Category } from "../models/index.js";
import { requireAdmin, tokenExtractor } from "../util/middleware.js";

const router = Router();

const categoryFinder = async (req, res, next) => {
  req.category = await Category.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res, next) => {
  const categories = await Category.findAll();
  res.json(categories);
});

router.post("/", tokenExtractor, requireAdmin, async (req, res, next) => {
  try {
    const category = await Category.create({
      ...req.body,
    });
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", categoryFinder, requireAdmin, async (req, res) => {
  if (req.category && req.user && req.user.admin) {
    await req.category.destroy();
  }
  res.status(204).end();
});

export { router as categoryRouter };
