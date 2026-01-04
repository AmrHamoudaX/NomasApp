import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import productService from "../services/products";
import ProductCard from "./ProductCard";
import { Alert } from "./Alert";

function ProductsPage() {
  const [products, setProducts] = useState(null);
  const [alertMsg, setAlertMsg] = useState(false);
  console.log(products);
  const [cart, setCart] = useState({
    orderId: null,
    items: {},
  });

  function addProduct(productId) {
    setCart((cart) => ({
      ...cart,
      items: {
        ...cart.items,
        [productId]: { quantity: 1 },
      },
    }));
  }
  console.log(cart);

  function increment(productId, productStockQuantity) {
    const newQuantity = cart.items[productId].quantity + 1;
    if (newQuantity >= productStockQuantity) {
      return setAlertMsg(true);
    }
    setCart((cart) => ({
      ...cart,
      items: {
        ...cart.items,
        [productId]: { quantity: newQuantity },
      },
    }));
  }
  function decrement(productId) {
    setCart((cart) => {
      const newQuantity = cart.items[productId].quantity - 1;
      if (newQuantity <= 0) {
        const { [productId]: _, ...rest } = cart.items;
        return { ...cart, items: rest };
      }
      return {
        ...cart,
        items: {
          ...cart.items,
          [productId]: { quantity: newQuantity },
        },
      };
    });
  }

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
    <div className="bg-white">
      <NavBar />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        {alertMsg && <Alert text={"You can’t add more."} status={"Error"} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products &&
            products.map((product) => {
              const quantity = cart.items[product.id]?.quantity ?? 0;
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={quantity}
                  onAdd={() => addProduct(product.id)}
                  onIncrement={() =>
                    increment(product.id, product.stockquantity)
                  }
                  onDecrement={() => decrement(product.id)}
                />
              );
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductsPage;
