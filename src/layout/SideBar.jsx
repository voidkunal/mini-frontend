import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetAuthSlice } from "../store/slice/authSlice";
import {
  toggleAddNewAdminPopup,
  toggleSettingPopup,
} from "../store/slice/popupSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AddNewAdmin from "../popups/AddNewAdmin";
import SettingPopup from "../popups/SettingPopup";

import logo_with_title from "../assets/logo-with-title.png";
import logoutIcon from "../assets/logout.png";
import dashboardIcon from "../assets/element.png";
import bookIcon from "../assets/book.png";
import settingIcon from "../assets/setting-white.png";
import usersIcon from "../assets/people.png";
import contactIcon from "../assets/contact.png";
import { RiAdminFill } from "react-icons/ri";
import { FiMenu, FiX } from "react-icons/fi";

const SideBar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent }) => {
  const dispatch = useDispatch();
  const { addNewAdminPopup, settingPopup } = useSelector((state) => state.popup);
  const { error, message, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [error, message, dispatch]);

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        className="md:hidden fixed top-5 left-4 z-50 bg-yellow-500 p-2 rounded-md text-white shadow-md"
      >
        {isSideBarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-yellow-500 text-white flex flex-col transition-transform duration-300 ease-in-out ${
          isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:h-screen`}
      >
        <div className="px-6 py-6">
          <img src={logo_with_title} alt="logo" className="w-full" />
        </div>

        <nav className="flex-1 px-6 space-y-3">
          <button
            onClick={() => setSelectedComponent("Dashboard")}
            className="flex items-center gap-2 w-full py-2 px-2 rounded hover:bg-yellow-600 transition"
          >
            <img src={dashboardIcon} alt="dashboard" className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setSelectedComponent("Books")}
            className="flex items-center gap-2 w-full py-2 px-2 rounded hover:bg-yellow-600 transition"
          >
            <img src={bookIcon} alt="books" className="w-5 h-5" />
            <span>Books</span>
          </button>

          {isAuthenticated && user?.role === "Admin" && (
            <>
              <button
                onClick={() => setSelectedComponent("Users")}
                className="flex items-center gap-2 w-full py-2 px-2 rounded hover:bg-yellow-600 transition"
              >
                <img src={usersIcon} alt="users" className="w-5 h-5" />
                <span>Users</span>
              </button>

              <button
                onClick={() => dispatch(toggleAddNewAdminPopup())}
                className="flex items-center gap-2 w-full py-2 px-2 rounded hover:bg-yellow-600 transition"
              >
                <RiAdminFill className="w-5 h-5" />
                <span>Add Admin</span>
              </button>
            </>
          )}

          <button
            onClick={() => dispatch(toggleSettingPopup())}
            className="flex items-center gap-2 w-full py-2 px-2 rounded hover:bg-yellow-600 transition"
          >
            <img src={settingIcon} alt="setting" className="w-5 h-5" />
            <span>Update Credentials</span>
          </button>
        </nav>

        <div className="mt-auto px-6 py-4">
          <Link
            to="/contact"
            className="flex items-center gap-2 w-full py-2 px-2 rounded hover:bg-yellow-600 transition"
          >
            <img src={contactIcon} alt="contact" className="w-5 h-5" />
            <span>Contact</span>
          </Link>

          <button
            onClick={handleLogout}
            className="mt-4 flex items-center gap-2 w-full py-2 px-2 rounded hover:bg-yellow-600 transition"
          >
            <img src={logoutIcon} alt="logout" className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Popups */}
      {addNewAdminPopup && <AddNewAdmin />}
      {settingPopup && <SettingPopup />}
    </>
  );
};

export default SideBar;
