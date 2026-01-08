import App from "./App";
import Dashboard from "./components/Dashboard";
import { LoginForm } from "./components/LoginForm";
import Orders from "./components/Orders";
import ProductManagement from "./components/ProductManagement";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/products", element: <ProductManagement /> },
      { path: "/orders", element: <Orders /> },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
];

export default routes;
