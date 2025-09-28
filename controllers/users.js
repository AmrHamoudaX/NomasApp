import { Router } from "express";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";

const router = Router();

const userFinder = async (req, res, next) => {
    req.user = await User.findByPk(req.params.id);
    next();
};

router.get("/", async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.post("/", async (req, res, next) => {
    try {
        const user = User.build(req.body);
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(req.body.password_hash, saltRounds);
        user.password_hash = passwordHash;
        await user.save();
        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", userFinder, async (req, res) => {
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(404).end();
    }
});

router.delete("/:id", userFinder, async (req, res) => {
    if (req.user) {
        await req.user.destroy();
    }
    res.status(204).end();
});

router.put("/:username", async (req, res, next) => {
    try {
        req.user = await User.findOne({ where: { username: req.params.username } });
        req.user.first_name = req.body.first_name;
        req.user.last_name = req.body.last_name;
        await req.user.save();
        res.json(req.user);
    } catch (error) {
        res.status(404).json({ error: error.message }).end();
        next(error);
    }
});

export { router as userRouter };
