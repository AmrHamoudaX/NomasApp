import App from "./App";
import { LoginForm } from "./components/LoginForm";
import { Categories } from "./components/Categories";
const routes = [
  { path: "/", element: <App /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/categories", element: <Categories /> },
];
export default routes;
