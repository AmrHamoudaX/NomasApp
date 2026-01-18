import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Alert from "./Alert.jsx";
import { loadStripe } from "@stripe/stripe-js";
import fetchClientSecret from "../services/stripe.js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

const stripePublishableKey =
  "pk_test_51SncUHA0YmyEyf7cAz3jN19oMpSgLT3XBUMlbybh6mCjhQqRIIDIaThpZDEprpxNIjadtJ7ECPt6ofOo3i3QBZwi005vMVnHCS";
const stripePromise = loadStripe(stripePublishableKey);
function Checkout() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [emptyCart, setEmptyCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const { cart, clearCart } = useOutletContext();
  const shippingFee = 25;
  const { totalAmount } = Object.values(cart.items).reduce(
    (acc, product) => {
      acc.totalAmount += Number(product.price) * product.orderedQuantity;
      return acc;
    },
    { totalAmount: 0 },
  );

  const options = {
    fetchClientSecret: () =>
      fetchClientSecret({
        cart: Object.entries(cart.items).map(([productId, product]) => ({
          productId,
          name: product.description,
          price: product.price,
          quantity: product.orderedQuantity,
        })),
      }),
  };

  return (
    <div className="bg-white">
      <div className="flex max-md:flex-col gap-12 max-lg:gap-4 h-full">
        <div className="bg-gray-100 md:h-screen md:sticky md:top-0 md:min-w-[370px]">
          <div className="relative h-full">
            <div className="px-6 py-8 md:overflow-auto md:h-screen">
              <div className="space-y-4">
                {Object.entries(cart.items).map(([productId, product]) => {
                  return (
                    <div key={productId} className="flex items-start gap-4">
                      <div className="size-30 shrink-0 overflow-hidden rounded-md ">
                        <img
                          alt="product.description"
                          src={
                            product.images.find(
                              (img) => img.imageRole == "main",
                            ).imageUrl
                          }
                          className="w-full object-contain"
                        />
                      </div>
                      <div className="w-full">
                        <h3 className="text-sm text-slate-900 font-semibold">
                          {product.description}
                        </h3>
                        <ul className="text-xs text-slate-900 space-y-2 mt-3">
                          <li className="flex flex-wrap gap-4">
                            Quantity{" "}
                            <span className="ml-auto">
                              {product.orderedQuantity}
                            </span>
                          </li>
                          <li className="flex flex-wrap gap-4">
                            Total Price
                            <span className="ml-auto font-semibold">
                              ${product.orderedQuantity * product.price}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  );
                })}
                <hr className="border-gray-300 my-8" />
                <div>
                  <ul className="text-slate-500 font-medium space-y-4">
                    <li className="flex flex-wrap gap-4 text-sm">
                      Subtotal
                      <span className="ml-auto font-semibold text-slate-900">
                        ${totalAmount}
                      </span>
                    </li>
                    <li className="flex flex-wrap gap-4 text-sm">
                      Shipping
                      <span className="ml-auto font-semibold text-slate-900">
                        ${shippingFee}
                      </span>
                    </li>
                    <hr className="border-slate-300" />
                    <li className="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900">
                      Total{" "}
                      <span className="ml-auto">
                        ${totalAmount + shippingFee}{" "}
                      </span>
                    </li>
                  </ul>
                  <div className="mt-8"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 max-md:-order-1">
          <div id="checkout">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
          {success && <Alert text={"Payment completed"} status="Success" />}
          {emptyCart && <Alert text={"Your Cart is Empty"} status="Error" />}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
