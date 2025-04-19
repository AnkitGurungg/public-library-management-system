import { Outlet, useNavigate } from "react-router-dom";
import Header from "../LibrarianAndAdmin/Header";
import ASidebar from "./ASidebar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import toast from "react-hot-toast";

const AAppLayout = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const { token, setToken, loading, userInfo, getUserInfo } =
    useContext(UserContext);
  const navigate = useNavigate();

  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }

  // useEffect(() => {
  //   if (loading) return;

  //   if (!userInfo || userInfo.role !== "ROLE_ADMIN") {
  //     toast.error("Forbidden!");
  //     navigate("/");
  //   }
  // }, [userInfo, loading]);

  // useEffect(() => {
  //   if (loading) return;

  //   // Wait until userInfo is available before checking role
  //   if (!userInfo) return;

  //   if (userInfo.role !== "ROLE_ADMIN") {
  //     toast.error("Forbidden!");
  //     navigate("/");
  //   }
  // }, [userInfo, loading]);

  // later on
  // useEffect(() => {
  //   if (loading || !userInfo) return;

  //   if (userInfo.role !== "ROLE_ADMIN") {
  //     console.log("no role", userInfo.role);
  //     toast.error("Forbidden!");
  //     navigate("/");
  //   }
  // }, [userInfo, loading]);

  // if (loading) {
  //   console.log("loading", userInfo.role);
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <h1 className="text-xl font-semibold">Loading...</h1>
  //     </div>
  //   );
  // }

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
