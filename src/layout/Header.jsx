// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettingPopup } from "../store/slice/popupSlice";
import settingIcon from "../assets/setting.png";
import userIcon from "../assets/user.png";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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
    <header className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-20">
      {/* Left Side: User Info */}
      <div className="flex items-center gap-3">
        <img src={userIcon} alt="User" className="w-10 h-10" />
        <div className="flex flex-col">
          <span className="text-sm font-semibold sm:text-base">
            {user?.name || "Admin"}
          </span>
          <span className="text-xs text-gray-600 capitalize">
            {user?.role || "admin"}
          </span>
        </div>
      </div>

      {/* Right Side: Time + Date + Settings */}
      <div className="hidden sm:flex items-center gap-4">
        <div className="flex flex-col text-right text-sm font-semibold">
          <span>{currentTime}</span>
          <span>{currentDate}</span>
        </div>
        <span className="h-10 w-[2px] bg-yellow-300" />
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
