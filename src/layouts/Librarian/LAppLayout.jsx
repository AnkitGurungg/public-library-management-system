import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "../LibrarianAndAdmin/Header";
import ASidebar from "../Admin/ASidebar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";

const LAppLayout = () => {
  const { userInfo, loading } = useContext(UserContext);
  const nagivate = useNavigate();

  const [sidebarToggle, setSidebarToggle] = useState(false);
  console.log(sidebarToggle);

  return (
    <div className="flex">
      <ASidebar sidebarToggle={sidebarToggle} />
      <div
        className={`w-full  transition-all duration-200 ${
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

export default LAppLayout;
