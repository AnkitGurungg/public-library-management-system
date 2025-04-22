import { Outlet, useNavigate } from "react-router-dom";
import Header from "../LibrarianAndAdmin/Header";
import ASidebar from "./ASidebar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import toast from "react-hot-toast";

const AAppLayout = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const navigate = useNavigate();

  const { loading, userInfo } = useContext(UserContext);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!userInfo || userInfo.role !== "ROLE_ADMIN") {
      // toast.error("Forbidden");
      navigate("/");
    }
  }, [userInfo, loading]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex h-screen">
      <ASidebar sidebarToggle={sidebarToggle} />
      <div
        className={`w-full transition-all duration-200 ${
          sidebarToggle ? "" : "ml-64"
        }`}
      >
        <Header
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
        <div className="flex-1 overflow-auto p-4 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AAppLayout;
