import { useEffect, useState } from "react";
import productService from "../services/products";
import ProductCard from "./ProductCard";
import { Alert } from "./Alert";
import { useOutletContext } from "react-router-dom";

function ProductsPage() {
  const [products, setProducts] = useState(null);
  const [alertMsg, setAlertMsg] = useState(false);
  const { cart, addProduct, increment, decrement } = useOutletContext();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const allProducts = await productService.getAll();
        setProducts(allProducts);
      } catch (err) {
        console.error(`Error fetching products: ${err}`);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products</h2>
      {alertMsg && <Alert text={"You can’t add more."} status={"Error"} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products &&
          products.map((product) => {
            const quantity = cart.items[product.id]?.orderedQuantity ?? 0;
            return (
              <ProductCard
                key={product.id}
                product={product}
                quantity={quantity}
                onAdd={() => addProduct(product)}
                onIncrement={() => increment(product, product.stockquantity)}
                onDecrement={() => decrement(product)}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ProductsPage;
