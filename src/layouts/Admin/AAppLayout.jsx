import { Outlet } from "react-router-dom";
import Header from "../LibrarianAndAdmin/Header";
import ASidebar from "./ASidebar";

const AAppLayout = () => {
  return (
    <div className="flex h-screen">
      <ASidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <div className="flex-1 overflow-auto p-4 bg-[#f1f1f1]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AAppLayout;
