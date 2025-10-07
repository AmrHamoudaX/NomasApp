import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import productService from "../services/products";
import { Link } from "react-router-dom";

function ProductLists() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const allProducts = await productService.getAll();
        console.log(allProducts);
        setProducts(allProducts);
      } catch (err) {
        console.error(`Error fetching products: ${err}`);
      }
    }
    fetchProducts();
  }, []);
  // console.log(products.map((product) => product.images[0].imageurl));

  return (
    <div className="bg-white">
      <NavBar />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link key={product.id} to={product.name} className="group">
              <img
                alt={product.description}
                src={product.images.map((image) => image.imageurl)}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
              />
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price}AED
              </p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductLists;
