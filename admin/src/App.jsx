import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="bg-gray-50 sm:ml-64 ">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
