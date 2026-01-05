import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const savedCartJSON = window.localStorage.getItem("savedCart");
    if (savedCartJSON) {
      const savedCart = JSON.parse(savedCartJSON);
      return savedCart;
    } else {
      return {
        orderId: null,
        items: {},
      };
    }
  });

  function handleCheckOut() {
    window.localStorage.setItem("savedCart", JSON.stringify(cart));
    return navigate("/checkout");
  }

  function handleRemoveFromCart(productId) {
    const { [productId]: _, ...rest } = cart.items;
    setCart((cart) => ({
      ...cart,
      items: rest,
    }));
  }

  function addProduct(product) {
    const {
      id: _id,
      categoryId: _categoryId,
      orderitems: _orderitems,
      ...rest
    } = product;
    setCart((cart) => ({
      ...cart,
      items: {
        ...cart.items,
        [product.id]: { ...rest, orderedQuantity: 1 },
      },
    }));
  }

  function increment(product, productStockQuantity) {
    const {
      id: _id,
      categoryId: _categoryId,
      orderitems: _orderitems,
      ...rest
    } = product;
    const newQuantity = cart.items[product.id].orderedQuantity + 1;
    if (newQuantity > productStockQuantity) {
      return;
    }
    setCart((cart) => ({
      ...cart,
      items: {
        ...cart.items,
        [product.id]: { ...rest, orderedQuantity: newQuantity },
      },
    }));
  }

  function decrement(product) {
    const {
      id: _id,
      categoryId: _categoryId,
      orderitems: _orderitems,
      ...rest
    } = product;
    setCart((cart) => {
      const newQuantity = cart.items[product.id].orderedQuantity - 1;
      if (newQuantity <= 0) {
        const { [product.id]: _, ...rest } = cart.items;
        return { ...cart, items: rest };
      }
      return {
        ...cart,
        items: {
          ...cart.items,
          [product.id]: { ...rest, orderedQuantity: newQuantity },
        },
      };
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar
        cart={cart}
        handleCheckOut={handleCheckOut}
        handleRemoveFromCart={handleRemoveFromCart}
      />
      <main className="flex-1">
        <Outlet
          context={{
            cart,
            addProduct,
            increment,
            decrement,
          }}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
