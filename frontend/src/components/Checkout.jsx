import { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Checkout() {
  const { cart } = useOutletContext();
  const shippingCost = 25;
  const { totalAmount, totalQuantity } = Object.values(cart.items).reduce(
    (acc, product) => {
      acc.totalQuantity += product.orderedQuantity;
      acc.totalAmount += Number(product.price) * product.orderedQuantity;
      return acc;
    },
    { totalAmount: 0, totalQuantity: 0 },
  );
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
                      <div className="w-24 h-24 flex p-3 shrink-0 bg-white rounded-md">
                        <img
                          alt="product.description"
                          src={
                            product.images.find(
                              (img) => img.imagerole == "main",
                            ).imageurl
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
                  <div className="mt-8">
                    <button
                      type="button"
                      className="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                    >
                      Complete Purchase
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 max-md:-order-1">
          <form>
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
                    type="text"
                    placeholder="Enter Full Name"
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-900 font-medium block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-900 font-medium block mb-2">
                    Phone No.
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Phone No."
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-900 font-medium block mb-2">
                    Address Line
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Address Line"
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-900 font-medium block mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Enter City"
                    className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
