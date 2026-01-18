import { Router } from "express";
import createCheckoutSession from "../util/stripeCheckoutSession.js";

const router = Router();

router.post("/create-checkout-session", async (req, res, next) => {
  try {
    const session = await createCheckoutSession(req.body);

    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    next(error);
  }
});

export { router as stripeRouter };
