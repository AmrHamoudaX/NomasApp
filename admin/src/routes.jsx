import App from "./App";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import ProductManagement from "./components/ProductManagement";

const routes = [
  {
    path: "/",
    element: (
      <AdminProtectedRoute>
        <App />
      </AdminProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/products", element: <ProductManagement /> },
      { path: "/orders", element: <Orders /> },
    ],
  },
];

export default routes;
