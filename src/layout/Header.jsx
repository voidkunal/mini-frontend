import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Settings } from "lucide-react";
import { toggleSettingPopup } from "../store/slice/popupSlice";
import SettingPopup from "../popups/SettingPopup";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { settingPopup } = useSelector((state) => state.popup);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-20 bg-white shadow px-4 py-3 flex flex-col sm:flex-row items-center justify-between sm:pl-64 gap-2">
        <div className="flex items-center gap-2 text-xl font-semibold whitespace-nowrap">
          <span role="img" aria-label="books">📚</span>
          <span>Study Era</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-700 whitespace-nowrap">
          <span>
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          <span>
            {new Date().toLocaleString("default", { month: "short" })}{" "}
            {new Date().getFullYear()}
          </span>
          {isAuthenticated && (
            <Settings
              className="w-5 h-5 cursor-pointer hover:text-gray-700"
              onClick={() => dispatch(toggleSettingPopup())}
            />
          )}
        </div>
      </header>
      {settingPopup && <SettingPopup />}
    </>
  );
};

export default Header;
