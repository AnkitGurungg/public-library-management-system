import { Outlet, useNavigate } from "react-router-dom";
import UHeader from "../User/UHeader";
import UPSidebar from "./UPSidebar";
import { UserContext } from "@/contexts/UserContext";
import { useContext, useEffect } from "react";

const UPApplayout = () => {
  const { token, setToken, loading, userInfo, getUserInfo } =
    useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("Authorization"));
    getUserInfo();
  }, []);

  useEffect(() => {
    console.log("UApplayout", userInfo);
    if (userInfo && Object.keys(userInfo).length > 0) {
      console.log("Updated user info:", userInfo);
    } else {
      navigate("/");
    }
  }, [userInfo]);

  return (
    <div className="flex h-screen">
      <UPSidebar className="fixed" />
      <Outlet className="flex-1 relative" />
    </div>
  );
};

export default UPApplayout;
