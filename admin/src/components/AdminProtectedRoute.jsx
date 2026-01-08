import { useNavigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const loggedInUser = localStorage.getItem("loggedUser");
  const navigate = useNavigate();
  if (!loggedInUser) {
    navigate("/");
    return null;
  }

  const user = JSON.parse(loggedInUser);

  if (!user.admin) {
    navigate("/");
    return null;
  }

  return children;
}

export default AdminProtectedRoute;
