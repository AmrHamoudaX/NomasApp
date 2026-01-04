import App from "./App";
import { LoginForm } from "./components/LoginForm.jsx";
import ProductsPage from "./components/ProductsPage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
];

export default routes;
