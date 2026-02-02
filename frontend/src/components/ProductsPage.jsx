import ProductCard from "./ProductCard";
import { useOutletContext } from "react-router-dom";

function ProductsPage() {
  const {
    cart,
    products,
    outOfStockProductId,
    addProduct,
    increment,
    decrement,
  } = useOutletContext();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products &&
          products.map((product) => {
            const quantity = cart.items[product.id]?.orderedQuantity ?? 0;
            const isOutOfStock = outOfStockProductId === product.id;
            return (
              <ProductCard
                key={product.id}
                product={product}
                quantity={quantity}
                isOutOfStock={isOutOfStock}
                onAdd={() => addProduct(product)}
                onIncrement={() => increment(product, product.stockQuantity)}
                onDecrement={() => decrement(product)}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ProductsPage;
