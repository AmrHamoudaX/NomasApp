import { Router } from "express";
import { User, Order, CartItem, Review, Payment } from "../models/index.js";
import bcrypt from "bcrypt";
import { tokenExtractor } from "../util/middleware.js";

const router = Router();

const userFinder = async (req, res, next) => {
  req.user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Order,
        attributes: { exclude: ["user_id"] },
      },
      {
        model: CartItem,
        attributes: { exclude: ["user_id"] },
      },
      {
        model: Review,
        attributes: { exclude: ["user_id"] },
      },
      {
        model: Payment,
        attributes: { exclude: ["user_id"] },
      },
    ],
  });
  next();
};

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Order,
        attributes: { exclude: ["user_id"] },
      },
      {
        model: CartItem,
        attributes: { exclude: ["user_id"] },
      },
      {
        model: Review,
        attributes: { exclude: ["user_id"] },
      },
      {
        model: Payment,
        attributes: { exclude: ["user_id"] },
      },
    ],
  });
  res.json(users);
});

router.post("/", async (req, res, next) => {
  try {
    const user = User.build(req.body);
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
    user.passwordhash = passwordHash;
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

router.put("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

export { router as userRouter };
