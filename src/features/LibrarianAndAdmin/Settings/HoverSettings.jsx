import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChevronRight, File, Lock, LogOut, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const HoverSettings = () => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="py-2">
          <div className="py-2 px-4 hover:bg-gray-700 hover:text-white flex flex-row items-center cursor-pointer rounded">
            <Settings className="mr-2" />
            Settings
            <ChevronRight className="ml-auto" />
          </div>
        </div>
      </HoverCardTrigger>

      <HoverCardContent className="w-auto py-2 px-2 m-1" side="right">
        <div className="py-0 my-0 pr-0.5">
          <button
            className="py-1 px-1.5 pr-3 hover:bg-gray-700 hover:text-white flex flex-row items-center rounded w-full h-full"
            activeclassname="bg-blue-600"
          >
            <Lock className="mr-0.5 h-6 w-5" />
            Change Password
          </button>
        </div>

        <div className="py-0 my-0 pr-0.5">
          <button
            className="py-1 px-1.5 pr-3 hover:bg-gray-700 hover:text-white flex flex-row items-center rounded w-full h-full"
            activeclassname="bg-blue-600"
            onClick={() => {
              localStorage.removeItem("Authorization");
              navigate("/");
            }}
          >
            <LogOut className="mr-0.5 h-6 w-5" />
            Logout
          </button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverSettings;
