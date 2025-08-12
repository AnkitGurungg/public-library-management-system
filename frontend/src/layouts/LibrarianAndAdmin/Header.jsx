import { UserContext } from "@/contexts/UserContext";
import { ChevronDown, Home, LogOut, Menu } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink, useNavigate } from "react-router-dom";
import GLOBAL_SERVICE, { S3_BASE_URL } from "@/services/GlobalServices";

const Header = ({ sidebarToggle, setSidebarToggle }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const { setToken, loading, userInfo, getUserInfo, setUserInfo } =
    useContext(UserContext);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const res = await GLOBAL_SERVICE.post(
          "/auth/logout",
          { refreshToken },
          // { skipAuthInterceptor: true },
        );
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("Authorization");
      localStorage.removeItem("refreshToken");
      setToken("");
      setUserInfo(null);
      navigate("/");
      // window.alert("Logged out successfully!");
    }
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });

      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-between border-l-1 border-grey-900 items-center bg-white drop-shadow-sm h-16">
      <div
        className="cursor-pointer ml-8"
        onClick={() => setSidebarToggle(!sidebarToggle)}
      >
        <Menu />
      </div>

      {userInfo && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg transition mr-1.5">
              <img
                src={
                  userInfo?.evidence?.userImage
                    ? `${S3_BASE_URL}/${userInfo?.evidence?.userImage}`
                    : `/user/default-user.png`
                }
                className="w-8 h-8 rounded-full object-cover"
                alt="User"
              />
              <div className="flex flex-col text-left">
                <p className="text-sm font-medium capitalize">
                  {userInfo?.name}
                </p>
                <p className="text-xs text-gray-500">{userInfo?.email}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 px-2 py-2">
            <NavLink to="/">
              <DropdownMenuItem className="w-full text-[16px]">
                <Home size={20} />
                Home
              </DropdownMenuItem>
            </NavLink>
            <DropdownMenuItem
              className="w-full text-[16px]"
              onClick={logoutHandler}
            >
              <LogOut size={20} />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default Header;
