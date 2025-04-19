import { Outlet, useNavigate } from "react-router-dom";
import UHeader from "../User/UHeader";
import UPSidebar from "./UPSidebar";
import { UserContext } from "@/contexts/UserContext";
import { useContext, useEffect } from "react";

const UPApplayout = () => {
  const { token, setToken, loading, userInfo, getUserInfo } = useContext(UserContext);
  
  console.log(getUserInfo);

  


  return (
    <div className="flex flex-1 overflow-auto">
      <UHeader />

      <div className="mt-[4.5rem] flex-1 overflow-auto">
        <div className="w-64 fixed overflow-auto h-full bg-amber-400">
          <UPSidebar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default UPApplayout;
