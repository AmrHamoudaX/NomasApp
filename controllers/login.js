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
      [Op.or]: [{ email: identifier }, { username: identifier }],
    },
  });

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordhash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    email: user.email,
    id: user.id,
  };
  //token expires in 60*60 seconds, that is, in one hour
  const token = jwt.default.sign(userForToken, SECRET_KEY, {
    expiresIn: 60 * 60,
  });

  res.status(200).send({
    token,
    username: user.username,
    email: user.email,
    firstName: user.firstname,
    lastName: user.lastname,
  });
});

export { router as loginRouter };
