import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "./config.js";
import { types } from "pg";

const stripe = Stripe(STRIPE_SECRET_KEY);

export default async function createCheckoutSession({ cart }) {
    return stripe.checkout.sessions.create({
        line_items: cart.map((item) => ({
            price_data: {
                currency: "aed",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(Number(item.price) * 100),
            },
            quantity: item.quantity,
        })),
        metadata: {
            cart: JSON.stringify(
                cart.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                })),
            ),
        },
        shipping_address_collection: {
            allowed_countries: ["AE"],
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 2500, //25 AED
                        currency: "aed",
                    },
                    display_name: "Standard Shipping",
                    delivery_estimate: {
                        minimum: { unit: "business_day", value: 2 },
                        maximum: { unit: "business_day", value: 4 },
                    },
                },
            },
        ],
        phone_number_collection: {
            enabled: true,
        },
        payment_method_types: ["card"],
        mode: "payment",
        ui_mode: "embedded",
        return_url:
            "https://nomasapp.onrender.com/checkout/return?session_id={CHECKOUT_SESSION_ID}",
    });
}
