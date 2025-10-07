import { Router } from "express";
import { Product, Image } from "../models/index.js";

const router = Router();

const imageFinder = async (req, res, next) => {
  req.image = await Image.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const images = await Image.findAll();
  res.json(images);
});

router.post("/", async (req, res, next) => {
  try {
    const image = await Image.create(req.body);
    res.json(image);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", imageFinder, async (req, res) => {
  if (req.image) {
    res.json(req.image);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", imageFinder, async (req, res) => {
  if (req.image) {
    await req.image.destroy();
  }
  res.status(204).end();
});

export { router as imageRouter };
