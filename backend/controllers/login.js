import { Router } from "express";
import { User } from "../models/index.js";
import * as jwt from "jsonwebtoken";
import { SECRET_KEY } from "../util/config.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

const router = Router();

router.post("/", async (req, res) => {
  const body = req.body;
  const identifier = body.identifier; // could be email or username
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: identifier }, { userName: identifier }],
    },
  });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(body.password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    id: user.id,
    userName: user.userName,
    email: user.email,
    admin: user.admin,
  };
  const token = jwt.default.sign(userForToken, SECRET_KEY, {});

  res.status(200).send({
    token,
    userName: user.userName,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    admin: user.admin,
  });
});

export { router as loginRouter };
