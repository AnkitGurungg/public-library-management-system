import { UserRoundCheck } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NavLink, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

export default function ProfilePopover() {
  const { setToken, loading, userInfo, getUserInfo, setUserInfo } =
    useContext(UserContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("Authorization");
    setToken("");
    setUserInfo({});
    // localStorage.removeItem("x-refresh-token");
    navigate("/");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative group">
          <UserRoundCheck className="opacity-80" />
          <span className="absolute bottom-full mt-0.5 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-600 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Profile
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <NavLink to="/member/profile/wish-list">
              <h4 className="font-medium leading-none">Wish List</h4>
            </NavLink>
          </div>
          <div className="space-y-2">
            <NavLink to="/member/profile/borrowed-books">
              <h4 className="font-medium leading-none">Borrowed Books</h4>
            </NavLink>
          </div>
          <div className="space-y-2">
            <NavLink to="/member/profile/fines">
              <h4 className="font-medium leading-none">Fines</h4>
            </NavLink>
          </div>
          <div className="grid gap-4">
            <div className="space-y-2 col-span-3">
              <NavLink to="/member/profile/account-settings">
                <h4 className="font-medium leading-none">Account Settings</h4>
              </NavLink>
            </div>
            <div className="grid grid-cols-3 items-center gap-4 hover:cursor-pointer">
              <div className="space-y-2">
                <h4
                  className="font-medium leading-none"
                  onClick={logoutHandler}
                >
                  Logout
                </h4>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
