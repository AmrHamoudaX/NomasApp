import App from "./App";
import Checkout from "./components/Checkout.jsx";
import HomePage from "./components/HomePage.jsx";
import { LoginForm } from "./components/LoginForm.jsx";
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
    ],
  },
];

export default routes;
