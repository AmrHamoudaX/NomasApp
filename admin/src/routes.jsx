import App from "./App";
import { LoginForm } from "./components/LoginForm";
import Products from "./components/Products";

const routes = [
  { path: "/", element: <App /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/products", element: <Products /> },
];
export default routes;
