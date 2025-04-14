import { useState, useEffect } from "react";

const Header = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

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
    <div className="border-l-1 border-grey-500 bg-white">
      <div className="flex flex-col w-[100px] justify-center ml-1 p-1">
        <p className="text-[18px]">{currentTime}</p>
        <p className="text-[14px]">{currentDate}</p>
      </div>
    </div>
  );
};

export default Header;
