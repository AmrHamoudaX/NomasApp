import { useEffect, useState } from "react";
import productService from "../services/products";

function useProducts() {
  const [products, setProducts] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState(null);

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

  // ------Featured Products-----
  useEffect(() => {
    async function getAllFeaturedProducts() {
      if (!products?.length) return;
      try {
        const allFeaturedProductIds = await productService.getAllFeatured();
        const allFeaturedProducts = allFeaturedProductIds.map((featuredId) =>
          products.find((product) => product.id == featuredId),
        );
        products.filter((product) => {
          return product.id == allFeaturedProductIds[0];
        });
        setFeaturedProducts(allFeaturedProducts);
      } catch (err) {
        console.error(`Error fetching featured products: ${err.message}`);
      }
    }
    getAllFeaturedProducts();
  }, [products]);
  // -----End Featured Products-----

  return {
    products,
    featuredProducts,
  };
}

export default useProducts;
