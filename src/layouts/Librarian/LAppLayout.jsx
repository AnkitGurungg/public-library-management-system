import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "../LibrarianAndAdmin/Header";
import ASidebar from "../Admin/ASidebar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import LSidebar from "./LSidebar";

const LAppLayout = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const { token, setToken, loading, userInfo, getUserInfo } =
    useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!userInfo || userInfo.role !== "ROLE_LIBRARIAN") {
      // toast.error("Forbidden!");
      navigate("/");
    }
  }, [userInfo, loading]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex">
      <LSidebar sidebarToggle={sidebarToggle} />
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
