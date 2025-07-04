// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";

const Header = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const date = now.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      setCurrentTime(time);
      setCurrentDate(date);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // update every 1 minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white shadow-sm px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">📚 Void Library</h1>

      <div className="flex items-center gap-4 text-sm sm:text-base text-gray-700">
        <span>{currentTime}</span>
        <span className="border-l h-4 border-gray-300"></span>
        <span>{currentDate}</span>
        <FaCog className="text-lg sm:text-xl cursor-pointer hover:text-black" />
      </div>
    </div>
  );
};

export default Header;