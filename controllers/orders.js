import { Router } from "express";
import { Order, Payment, OrderItem } from "../models/index.js";

const router = Router();

const orderFinder = async (req, res, next) => {
    (req.order = await Order.findByPk(req.params.id, {
        include: [
            {
                model: OrderItem,
                attributes: { exclude: ["orderId"] },
            },
            {
                model: Payment,
                attributes: { exclude: ["orderId"] },
            },
        ],
    })),
        next();
};

router.get("/", async (req, res) => {
    const orders = await Order.findAll({
        include: [
            {
                model: OrderItem,
                attributes: { exclude: ["orderId"] },
            },
            {
                model: Payment,
                attributes: { exclude: ["orderId"] },
            },
        ],
    });
    res.json(orders);
});

router.post("/", async (req, res, next) => {
    try {
        const order = Order.create(req.body);
        res.json(order);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", orderFinder, async (req, res) => {
    if (req.order) {
        res.json(req.order);
    } else {
        res.status(404).end();
    }
});

router.delete("/:id", orderFinder, async (req, res) => {
    if (req.order) {
        await req.order.destroy();
    }
    res.status(204).end();
});

export { router as orderRouter };
