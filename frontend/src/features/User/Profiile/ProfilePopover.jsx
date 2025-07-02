import {
  Book,
  ChevronRight,
  CreditCard,
  Heart,
  LogOut,
  Settings,
  UserRoundCheck,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NavLink, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { useFetchMemberWishListIds } from "@/hooks/useFetchMemberWishListIds";

export default function ProfilePopover() {
  const { setToken, loading, userInfo, getUserInfo, setUserInfo } =
    useContext(UserContext);
  const navigate = useNavigate();
  const { refetch: refetchMemberWishListIds } = useFetchMemberWishListIds();

  const logoutHandler = () => {
    localStorage.removeItem("Authorization");
    setToken("");
    setUserInfo(null);
    refetchMemberWishListIds();
    // localStorage.removeItem("x-refresh-token");
    navigate("/");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative group hover:cursor-pointer">
          <UserRoundCheck className="opacity-80" />
          <span className="absolute bottom-full mt-0.5 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-600 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Profile
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="grid gap-3">
          <div className="flex items-center gap-0.5 hover:bg-[#d9d9d9] hover:rounded-md py-1 pl-1">
            <Heart className="mr-2 h-5 w-5" />
            <NavLink to="/member/profile/wish-list">
              <h4 className="font-medium leading-none">Wish List</h4>
            </NavLink>
          </div>
          <div className="flex items-center gap-0.5 hover:bg-[#d9d9d9] hover:rounded-md py-1 pl-1">
            <Book className="mr-2 h-5 w-5" />
            <NavLink to="/member/profile/borrowed-books">
              <h4 className="font-medium leading-none">Borrowed Books</h4>
            </NavLink>
          </div>
          <div className="flex items-center gap-0.5 hover:bg-[#d9d9d9] hover:rounded-md py-1 pl-1">
            <CreditCard className="mr-2 h-5 w-5" />
            <NavLink to="/member/profile/fines">
              <h4 className="font-medium leading-none">Fines</h4>
            </NavLink>
          </div>
          <div className="flex items-center gap-0.5 hover:bg-[#d9d9d9] hover:rounded-md py-1 pl-1">
            <Settings className="mr-2 h-5 w-5" />
            <div className="space-y-2 col-span-3">
              <NavLink to="/member/profile/account-settings">
                <h4 className="font-medium leading-none">Account Settings</h4>
              </NavLink>
            </div>
          </div>
          <div
            className="flex items-center gap-0.5 hover:bg-[#d9d9d9] hover:rounded-md py-1 pl-1 cursor-pointer"
            onClick={logoutHandler}
          >
            <LogOut className="mr-2 h-5 w-5" />
            <h4 className="font-medium leading-none">Logout</h4>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
