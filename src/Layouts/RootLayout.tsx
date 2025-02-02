import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Home/Sidebar";

const RootLayout = () => {
  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
