import { Outlet } from "react-router-dom";
import Sidebar from "@/components/admin/layout/Sidebar";
import Navbar from "../components/admin/layout/Navbar";

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <div className="p-3 mt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
