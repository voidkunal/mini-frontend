// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleSettingPopup } from "../store/slice/popupSlice";
import settingIcon from "../assets/setting.png";

const Header = () => {
  const dispatch = useDispatch();

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      const formattedTime = `${hours}:${minutes} ${ampm}`;
      const formattedDate = now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      setCurrentTime(formattedTime);
      setCurrentDate(formattedDate);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-end sticky top-0 z-20">
      {/* Right Side: Time + Date + Settings */}
      <div className="flex items-center gap-4">
        <div className="text-right text-sm font-semibold hidden sm:block">
          <div>{currentTime}</div>
          <div>{currentDate}</div>
        </div>
        <span className="h-10 w-[2px] bg-yellow-300 hidden sm:block" />
        <button onClick={() => dispatch(toggleSettingPopup())}>
          <img
            src={settingIcon}
            alt="Settings"
            className="w-8 h-8 cursor-pointer"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
