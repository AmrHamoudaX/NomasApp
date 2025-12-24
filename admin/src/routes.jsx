import App from "./App";
import { LoginForm } from "./components/LoginForm";
import { Categories } from "./components/Categories";
import { Products } from "./components/Products";
const routes = [
  { path: "/", element: <App /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/categories", element: <Categories /> },
  { path: "/products", element: <Products /> },
];
export default routes;
