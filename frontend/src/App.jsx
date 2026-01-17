import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import productService from "./services/products";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0, "smooth");
  }, []);
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [outOfStockProductId, setOutOfStockProductId] = useState(null);
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

  function handleCheckOut() {
    window.localStorage.setItem("savedCart", JSON.stringify(cart));
    return navigate("/checkout");
  }

  function handleRemoveFromCart(productId) {
    const { [productId]: _, ...rest } = cart.items;
    const newCart = {
      ...cart,
      items: rest,
    };
    setCart(newCart);
    window.localStorage.setItem("savedCart", JSON.stringify(newCart));
  }

  function clearCart() {
    setCart({ orderId: null, items: {} });
    window.localStorage.removeItem("savedCart");
  }
  function addProduct(product) {
    if (product.stockQuantity >= 1) {
      setOutOfStockProductId(null);
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
    } else {
      setOutOfStockProductId(product.id);
    }
  }

  function increment(product, productStockQuantity) {
    const {
      id: _id,
      categoryId: _categoryId,
      orderItems: _orderItems,
      ...rest
    } = product;
    const newQuantity = cart.items[product.id].orderedQuantity + 1;
    if (newQuantity > productStockQuantity) {
      setOutOfStockProductId(product.id);
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
    setOutOfStockProductId(null);
    const {
      id: _id,
      categoryId: _categoryId,
      orderItems: _orderItems,
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
            }}
          />
        </ScrollToTop>
      </main>
      <Footer />
    </div>
  );
}

export default App;
