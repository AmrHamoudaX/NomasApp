import App from "./App";
import { LoginForm } from "./components/LoginForm";
import ProductManagement from "./components/ProductManagement";

const routes = [
  { path: "/", element: <App /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/products", element: <ProductManagement /> },
];
export default routes;
