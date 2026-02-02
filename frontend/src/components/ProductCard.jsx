import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Counter } from "./Counter";
import { AddBtn } from "./AddBtn";
import Alert from "./Alert";

function ProductCard({
  product,
  quantity,
  isOutOfStock,
  onAdd,
  onIncrement,
  onDecrement,
}) {
  return (
    <div
      key={product.id}
      className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-200">
        <Link to={product.id}>
          <img
            src={product.images.find((img) => img.imageRole == "main").imageUrl}
            alt={product.description}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className="w-5 h-5 text-gray-900" />
          </button>
        </Link>
      </div>
      <div className="p-4">
        <h3 className="text-lg text-center font-bold text-gray-900 line-clamp-2 min-h-[3.5rem]">
          {product.description}
        </h3>
        <div className="flex items-center flex-col flex-1 gap-3">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          {quantity === 0 ? (
            <AddBtn handleQuantity={onAdd} />
          ) : (
            <Counter
              quantity={quantity}
              handleIncrement={onIncrement}
              handleDecrement={onDecrement}
            />
          )}
        </div>
      </div>
      {isOutOfStock && (
        <Alert status="Error" text="Can’t add more — stock limit reached" />
      )}
    </div>
  );
}

export default ProductCard;
