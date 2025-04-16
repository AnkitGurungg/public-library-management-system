import { Outlet } from "react-router-dom";
import Header from "../LibrarianAndAdmin/Header";
import ASidebar from "./ASidebar";
import { useState } from "react";

const AAppLayout = () => {

  const [sidebarToggle, setSidebarToggle] = useState(false);
  console.log(sidebarToggle)

  return (
    <div className="flex h-screen">
      <ASidebar sidebarToggle={sidebarToggle}/>
      <div className={`w-full transition-all duration-200 ${sidebarToggle ? "" : "ml-64"}`}>
        <Header sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>
        <div className="flex-1 overflow-auto p-4 bg-[#f1f1f1]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AAppLayout;
