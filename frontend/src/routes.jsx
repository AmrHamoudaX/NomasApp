import App from "./App";
import Checkout from "./components/Checkout.jsx";
import CheckoutReturn from "./components/CheckoutReturn.jsx";
import HomePage from "./components/HomePage.jsx";
import { LoginForm } from "./components/LoginForm.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import ProductsPage from "./components/ProductsPage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "login", element: <LoginForm /> },
      { path: "checkout", element: <Checkout /> },
      { path: "checkout/return", element: <CheckoutReturn /> },
      //  404 route (must be LAST)
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

export default routes;
