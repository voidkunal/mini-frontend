import React, { useState, useEffect } from "react";
import settingIcon from "../assets/setting.png";
import userIcon from "../assets/user.png";
import menuIcon from "../assets/menu.png";
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
    <header className="w-full bg-white px-4 py-3 shadow-md flex items-center justify-between z-50 sticky top-0">
      {/* Left Section: Hamburger + User Info */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          className="block md:hidden p-2 rounded hover:bg-yellow-200 transition"
          onClick={() => setIsSideBarOpen((prev) => !prev)}
        >
          <img src={menuIcon} alt="Menu" className="w-6 h-6" />
        </button>

        <img src={userIcon} alt="User Icon" className="w-8 h-8 hidden sm:block" />

        <div className="flex flex-col overflow-hidden">
          <span className="text-sm font-semibold truncate sm:text-base md:text-lg">
            {user?.name || "Guest"}
          </span>
          <span className="text-xs font-medium text-gray-600 sm:text-sm capitalize">
            {user?.role || "User"}
          </span>
        </div>
      </div>

      {/* Right Section: Clock + Settings */}
      <div className="hidden sm:flex items-center gap-4">
        <div className="flex flex-col text-right font-medium text-sm md:text-base">
          <span>{currentTime}</span>
          <span>{currentDate}</span>
        </div>
        <span className="bg-yellow-300 h-10 w-[2px]" />
        <img
          src={settingIcon}
          alt="Settings"
          className="w-7 h-7 cursor-pointer"
          onClick={() => dispatch(toggleSettingPopup())}
        />
      </div>
    </header>
  );
};

export default Header;
