import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "../LibrarianAndAdmin/Header";
import ASidebar from "../Admin/ASidebar";
import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/UserContext";

const LAppLayout = () => {
  const { userInfo, loading } = useContext(UserContext);
  const nagivate = useNavigate();

  return (
    <div className="flex h-screen">
      <ASidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <div className="flex-1 overflow-auto p-4 la-content-bg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LAppLayout;
