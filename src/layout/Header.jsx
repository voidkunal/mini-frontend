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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-2">
        <img src={userIcon} alt="user icon" className="w-8 h-8" />
        <div className="flex flex-col leading-tight">
          <span className="text-sm md:text-lg font-semibold capitalize">
            {user?.name || "Guest"}
          </span>
          <span className="text-xs md:text-sm text-gray-600">{user?.role || "User"}</span>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-3">
        <div className="text-right text-xs md:text-sm font-medium">
          <div>{currentTime}</div>
          <div>{currentDate}</div>
        </div>
        <span className="h-10 w-[1px] bg-yellow-400 hidden md:block" />
        <img
          src={settingIcon}
          alt="settings"
          className="w-6 h-6 md:w-7 md:h-7 cursor-pointer"
          onClick={() => dispatch(toggleSettingPopup())}
        />
      </div>
    </header>
  );
};

export default Header;
