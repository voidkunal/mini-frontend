import React, { useState, useEffect } from "react";
import settingIcon from "../assets/setting.png";
import userIcon from "../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettingPopup } from "../store/slice/popupSlice";

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
      setCurrentTime(`${hours}:${minutes} ${ampm}`);

      const options = { month: "short", day: "numeric", year: "numeric" };
      setCurrentDate(now.toLocaleDateString("en-US", options));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-2">
        <img src={userIcon} alt="user icon" className="w-8 h-8" />
        <div className="flex flex-col">
          <span className="text-sm font-medium sm:text-lg lg:text-xl sm:font-semibold">
            {user?.name || "Guest"}
          </span>
          <span className="text-sm font-medium sm:text-lg sm:font-medium">
            {user?.role || "User"}
          </span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex items-center gap-2">
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
