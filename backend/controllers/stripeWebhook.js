import Stripe from "stripe";
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from "../util/config.js";
import { Order, OrderItem, Product } from "../models/index.js";
import { sequelize } from "../util/db.js";
import renderReceiptTemplate from "../util/renderReceiptTemplate.js";
import generatePdfFromHtml from "../util/pdfGenerator.js";
import sendReceiptEmail from "../util/emailSender.js";
import logoBase64 from "../util/imageToBase64.js";

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
    if (!session.metadata?.cart) {
      throw new Error("Missing cart metadata");
    }
    // IMPORTANT:
    // Order + OrderItems are created ONLY here,
    // inside a transaction, after Stripe confirmation.

    let createdOrder;
    await sequelize.transaction(async (t) => {
      const order = await Order.create(
        {
          fullName: session.customer_details?.name ?? "Unknown",
          email: session.customer_details?.email ?? "unknown@email.com",
          phoneNumber: session.customer_details?.phone ?? "N/A",

          addressLine1: session.customer_details.address?.line1 ?? "N/A",
          addressLine2: session.customer_details.address?.line2 ?? null,
          city: session.customer_details.address?.state ?? "N/A",

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
      createdOrder = order;
    });

    //Fetch order items with product info
    const orderItems = await OrderItem.findAll({
      where: { orderId: createdOrder.id },
      include: [{ model: Product }],
    });
    //Prepare Receipt data
    const html = renderReceiptTemplate({
      orderId: createdOrder.id,
      fullName: createdOrder.fullName,
      email: createdOrder.email,
      phoneNumber: createdOrder.phoneNumber,
      addressLine1: createdOrder.addressLine1,
      addressLine2: createdOrder.addressLine2 || "N/A",
      city: createdOrder.city,
      receiptDate: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      items: orderItems.map((item) => ({
        name: item.product?.description || "Product",
        quantity: item.quantity,
        price: Number(item.price || item.Product?.price || 0),
        total:
          Number(item.quantity) *
          Number(item.price || item.Product?.price || 0),
      })),
      subtotal: orderItems.reduce(
        (sum, item) =>
          sum + Number(item.price || item.Product?.price || 0) * item.quantity,
        0,
      ),
      shippingFee: Number(createdOrder.shippingFee),
      totalAmount: Number(createdOrder.totalAmount),
      stripePaymentIntentId: createdOrder.stripePaymentIntentId,
      //Change it to every store's logo later
      logoUrl: logoBase64,
    });

    //Generate PDF
    const pdfBuffer = await generatePdfFromHtml(html);
    console.log(pdfBuffer);

    //Send receipt email
    await sendReceiptEmail({
      to: "legithamouda@gmail.com",
      subject: `Receipt #${createdOrder.id} - New Order`,
      pdfBuffer,
      orderId: createdOrder.id,
    });
  }

  res.json({ received: true });
}
