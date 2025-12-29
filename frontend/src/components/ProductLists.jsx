import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import productService from "../services/products";
import ProductCard from "./ProductCard";

function ProductLists() {
  const [products, setProducts] = useState(null);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products &&
            products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductLists;
