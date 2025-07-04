// Header.jsx
import React, { useState, useEffect } from "react";
import settingIcon from "../assets/setting.png";
import userIcon from "../assets/user.png";
import menuIcon from "../assets/menu.png"; // hamburger icon
import { useDispatch, useSelector } from "react-redux";
import { toggleSettingPopup } from "../store/slice/popupSlice";

const Header = ({ setIsSideBarOpen }) => {
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
      setCurrentTime(`${hours}:${minutes} ${ampm}`);

      const options = { month: "short", day: "numeric", year: "numeric" };
      setCurrentDate(now.toLocaleDateString("en-US", options));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="absolute top-0 left-0 bg-white w-full py-4 px-4 sm:px-6 shadow-md flex justify-between items-center z-50">
      {/* LEFT: Hamburger + user info */}
      <div className="flex items-center gap-3">
        <button
          className="block md:hidden p-2 rounded hover:bg-yellow-200 transition"
          onClick={() => setIsSideBarOpen(prev => !prev)}
        >
          <img src={menuIcon} alt="Menu" className="w-6 h-6" />
        </button>
        <img src={userIcon} alt="user icon" className="w-8 h-8 hidden sm:block" />
        <div className="flex flex-col">
          <span className="text-sm font-medium sm:text-lg lg:text-xl sm:font-semibold">
            {user?.name || "Guest"}
          </span>
          <span className="text-sm font-medium sm:text-base">
            {user?.role || "User"}
          </span>
        </div>
      </div>

      {/* RIGHT: Clock + Settings */}
      <div className="hidden md:flex items-center gap-4">
        <div className="flex flex-col text-sm lg:text-base items-end font-semibold">
          <span>{currentTime}</span>
          <span>{currentDate}</span>
        </div>
        <span className="bg-yellow-300 h-14 w-[2px]" />
        <img
          src={settingIcon}
          alt="settings"
          className="w-8 h-8 cursor-pointer"
          onClick={() => dispatch(toggleSettingPopup())}
        />
      </div>
    </header>
  );
};

export default Header;
