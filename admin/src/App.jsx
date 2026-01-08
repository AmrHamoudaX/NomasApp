import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 bg-gray-50 lg:ml-64 ">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
