import App from "./App";
import { LoginForm } from "./components/LoginForm.jsx";
import ProductLists from "./components/ProductLists.jsx";

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
    element: <ProductLists />,
  },
];

export default routes;
