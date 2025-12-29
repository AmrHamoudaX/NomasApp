import { Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function QuantityCounter() {
  const [counter, setCounter] = useState(0);
  function handleCounter(e) {
    if (e.target.id === "increment") {
      setCounter(counter + 1);
    } else if (e.target.id === "decrement") {
      setCounter(counter - 1);
    }
  }
  return (
    <>
      {counter === 0 ? (
        <button
          className="bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          onClick={() => setCounter(1)}
        >
          Add
        </button>
      ) : (
        <form className="max-w-xs mx-auto">
          <div className="relative flex items-center max-w-[8rem]">
            <button
              type="button"
              id="decrement"
              data-input-counter-decrement="quantity-input"
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 "
              onClick={handleCounter}
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="text"
              id="quantity-input"
              data-input-counter=""
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={counter}
              disabled
              required=""
            />
            <button
              type="button"
              id="increment"
              data-input-counter-increment="quantity-input"
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11"
              onClick={handleCounter}
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
        </form>
      )}
    </>
  );
}

function ProductCard({ product }) {
  return (
    <div
      key={product.id}
      className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-200">
        <Link to={product.id}>
          <img
            src={product.images.find((img) => img.imagerole == "main").imageurl}
            alt={product.description}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className="w-5 h-5 text-gray-900" />
          </button>
        </Link>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 ">
          {product.description}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          <QuantityCounter />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
