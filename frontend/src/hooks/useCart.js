import { useState } from "react";

export default function useCart() {
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

  function handleRemoveFromCart(productId) {
    const { [productId]: _, ...rest } = cart.items;
    const newCart = {
      ...cart,
      items: rest,
    };
    setCart(newCart);
    window.localStorage.setItem("savedCart", JSON.stringify(newCart));
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

  return {
    cart,
    outOfStockProductId,
    addProduct,
    increment,
    decrement,
    clearCart,
    handleRemoveFromCart,
  };
}
