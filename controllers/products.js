import { Router } from "express";
import { Product } from "../models/index.js";

const router = Router();

const productFinder = async (req, res, next) => {
    req.product = await Product.findByPk(req.params.id);
    next();
};

router.get("/", async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
});

router.post("/", async (req, res, next) => {
    try {
        const product = await Product.create({
            ...req.body,
        });
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

router.delete("/:id", productFinder, async (req, res) => {
    if (req.product) {
        await req.product.destroy();
    }
    res.status(204).end();
});

export { router as productRouter };
