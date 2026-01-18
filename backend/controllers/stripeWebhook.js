import Stripe from "stripe";
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from "../util/config.js";
import { Order, OrderItem } from "../models/index.js";
import { sequelize } from "../util/db.js";

const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function stripeWebhookHandler(req, res) {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Only act on successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log(session);
    if (!session.metadata?.cart) {
      throw new Error("Missing cart metadata");
    }

    // IMPORTANT:
    // Order + OrderItems are created ONLY here,
    // inside a transaction, after Stripe confirmation.

    await sequelize.transaction(async (t) => {
      const order = await Order.create(
        {
          fullName: session.customer_details?.name ?? "Unknown",
          email: session.customer_details?.email ?? "",
          phoneNumber: session.customer_details?.phone ?? "",

          addressLine1: session.customer_details.address?.line1 ?? "",
          addressLine2: session.customer_details.address?.line2 ?? "",
          city: session.customer_details.address?.state ?? "",

          totalAmount: session.amount_total / 100, //includes shipping line
          shippingFee: Number(
            session.total_details?.amount_shipping / 100 ?? 0,
          ),
          status: "confirmed",

          stripeSessionId: session.id,
          stripePaymentIntentId: session.payment_intent,
        },
        { transaction: t },
      );
      if (!session.metadata?.cart) {
        throw new Error("Missing cart metadata");
      }
      const cart = JSON.parse(session.metadata.cart);
      for (const item of cart) {
        await OrderItem.create(
          {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
          },
          { transaction: t },
        );
      }
    });
  }

  res.json({ received: true });
}
