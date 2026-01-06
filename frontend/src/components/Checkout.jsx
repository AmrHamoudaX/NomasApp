import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import orderService from "../services/orders";
import orderItemService from "../services/orderItems";
import Alert from "./Alert.jsx";

function Checkout() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [emptyCart, setEmptyCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const { cart, clearCart } = useOutletContext();
  const shippingCost = 0;
  const [guestInfo, setGuestInfo] = useState({
    fullName: "ali",
    email: "ali@email.com",
    address: "AlDhaid",
    city: "Sharjah",
    phoneNumber: "0501234567",
  });
  const { totalAmount } = Object.values(cart.items).reduce(
    (acc, product) => {
      acc.totalAmount += Number(product.price) * product.orderedQuantity;
      return acc;
    },
    { totalAmount: 0 },
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!Object.keys(cart.items).length) {
      setEmptyCart(true);
      return;
    }
    setEmptyCart(false);
    setLoading(true);
    try {
      const order = await orderService.create({
        ...guestInfo,
        addressLine1: guestInfo.address,
      });

      await Promise.all(
        Object.entries(cart.items).map(([productId, product]) => {
          const orderItem = orderItemService.create({
            orderId: order.id,
            productId,
            quantity: product.orderedQuantity,
            price: product.price,
          });
          return orderItem;
        }),
      );
      setGuestInfo({
        fullName: "",
        email: "",
        address: "",
        city: "",
        phoneNumber: "0501234567",
      });
      setSuccess(true);
      clearCart();
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setGuestInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

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
                        ${shippingCost}
                      </span>
                    </li>
                    <hr className="border-slate-300" />
                    <li className="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900">
                      Total{" "}
                      <span className="ml-auto">
                        ${totalAmount + shippingCost}{" "}
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
          <form onSubmit={handleSubmit}>
            <div>
              <h2 className="text-xl text-slate-900 font-semibold mb-6">
                Delivery Details
              </h2>
              <div className="grid lg:grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <label className="text-sm text-slate-900 font-medium block mb-2">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Enter Full Name"
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    value={guestInfo.fullName}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-900 font-medium block mb-2">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    value={guestInfo.email}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-900 font-medium block mb-2">
                    Phone No.
                  </label>
                  <input
                    name="phoneNumber"
                    type="tel"
                    value={guestInfo.phoneNumber}
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter Phone No."
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    maxLength="10"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-900 font-medium block mb-2">
                    Address Line
                  </label>
                  <input
                    name="address"
                    type="text"
                    placeholder="Enter Address Line"
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    value={guestInfo.address}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-900 font-medium block mb-2">
                    City
                  </label>
                  <input
                    name="city"
                    type="text"
                    placeholder="Enter City"
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    value={guestInfo.city}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`mt-6 rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white cursor-pointer`}
              >
                Complete Purchase
              </button>
              {success && <Alert text={"Payment completed"} status="Success" />}
              {emptyCart && (
                <Alert text={"Your Cart is Empty"} status="Error" />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
