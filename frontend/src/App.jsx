import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import productService from "./services/products";
import ScrollToTop from "./components/ScrollToTop";
import useProducts from "./hooks/useProduct.js";
import useCart from "./hooks/useCart.js";

function App() {
  const navigate = useNavigate();
  const { products, featuredProducts } = useProducts();
  const {
    cart,
    outOfStockProductId,
    addProduct,
    increment,
    decrement,
    clearCart,
    handleRemoveFromCart,
  } = useCart();

  function handleCheckOut() {
    window.localStorage.setItem("savedCart", JSON.stringify(cart));
    return navigate("/checkout");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar
        cart={cart}
        handleCheckOut={handleCheckOut}
        handleRemoveFromCart={handleRemoveFromCart}
      />
      <main className="flex-1">
        <ScrollToTop>
          <Outlet
            context={{
              cart,
              addProduct,
              increment,
              decrement,
              clearCart,
              products,
              outOfStockProductId,
              featuredProducts,
            }}
          />
        </ScrollToTop>
      </main>
      <Footer />
    </div>
  );
}

export default App;
