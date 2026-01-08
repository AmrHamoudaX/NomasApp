import App from "./App";
import { LoginForm } from "./components/LoginForm";
import Orders from "./components/Orders";
import ProductManagement from "./components/ProductManagement";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ProductManagement /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/orders", element: <Orders /> },
    ],
  },
];

export default routes;
