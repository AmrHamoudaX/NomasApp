import App from "./App";
import { LoginForm } from "./components/LoginForm.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
];

export default routes;
