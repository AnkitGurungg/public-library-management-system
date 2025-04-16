import { UserContext } from "@/contexts/UserContext";
import { Menu } from "lucide-react";
import { useState, useEffect, useContext } from "react";


const Header = ({sidebarToggle, setSidebarToggle}) => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // const {}= useContext(UserContext);

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
    <div className="px-8 flex justify-between border-l-1 border-grey-900 items-center bg-white drop-shadow-sm h-14">
      <div className="cursor-pointer"
      onClick={()=> setSidebarToggle(!sidebarToggle)}>
        <Menu />
      </div>

      <div className="flex items-center gap-3">
        <img src="/9781786330895-3407.webp" className="w-8 h-8 rounded-full overflow-hidden object-cover" alt="" />
        
      </div>
      
    </div>
    
  );
};

export default Header;
