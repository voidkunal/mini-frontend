// ✅ Responsive Sidebar
import React, { useEffect, useState } from "react";
import logo_with_title from "../assets/logo-with-title.png";
import logoutIcon from "../assets/logout.png";
import closeIcon from "../assets/white-close-icon.png";
import dashboardIcon from "../assets/element.png";
import bookIcon from "../assets/book.png";
import settingIcon from "../assets/setting-white.png";
import usersIcon from "../assets/people.png";
import contactIcon from "../assets/contact.png";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetAuthSlice } from "../store/slice/authSlice";
import { toggleAddNewAdminPopup, toggleSettingPopup } from "../store/slice/popupSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AddNewAdmin from "../popups/AddNewAdmin";
import SettingPopup from "../popups/SettingPopup";
import { HiMenu } from "react-icons/hi";

const SideBar = ({ setSelectedComponent }) => {
  const dispatch = useDispatch();
  const { addNewAdminPopup, settingPopup } = useSelector((state) => state.popup || {});
  const { error, message, isAuthenticated, user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => dispatch(logout());

  useEffect(() => {
    if (error) toast.error(error);
    if (message) toast.success(message);
    if (error || message) dispatch(resetAuthSlice());
  }, [error, message, dispatch]);

  const menuItems = [
    { name: "Dashboard", icon: dashboardIcon },
    { name: "Books", icon: bookIcon },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-30 md:hidden bg-yellow-500 p-2 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <HiMenu size={24} className="text-white" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-yellow-500 text-white z-40 transform transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:flex`}
      >
        <div className="flex flex-col h-full">
          <div className="px-6 py-6">
            <img src={logo_with_title} alt="logo" />
          </div>

          <nav className="flex-1 px-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setSelectedComponent(item.name)}
                className="w-full py-2 font-medium flex items-center space-x-2 hover:bg-yellow-600 rounded-md"
              >
                <img src={item.icon} alt={item.name} className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            ))}

            {isAuthenticated && user?.role === "Admin" && (
              <>
                <button
                  onClick={() => setSelectedComponent("Users")}
                  className="w-full py-2 font-medium flex items-center space-x-2 hover:bg-yellow-600 rounded-md"
                >
                  <img src={usersIcon} alt="Users" className="w-5 h-5" />
                  <span>Users</span>
                </button>

                <button
                  onClick={() => dispatch(toggleAddNewAdminPopup())}
                  className="w-full py-2 font-medium flex items-center space-x-2 hover:bg-yellow-600 rounded-md"
                >
                  <RiAdminFill className="w-5 h-5" /> <span>Add New Admin</span>
                </button>
              </>
            )}

            <button
              onClick={() => dispatch(toggleSettingPopup())}
              className="w-full py-2 font-medium flex items-center space-x-2 hover:bg-yellow-600 rounded-md"
            >
              <img src={settingIcon} alt="Settings" className="w-5 h-5" />
              <span>Update Credentials</span>
            </button>

            <Link
              to="/contact"
              className="w-full py-2 font-medium flex items-center space-x-2 hover:bg-yellow-600 rounded-md"
            >
              <img src={contactIcon} alt="Contact" className="w-5 h-5" />
              <span>Contact</span>
            </Link>
          </nav>

          <div className="px-6 py-4 mt-auto">
            <button
              onClick={handleLogout}
              className="w-full py-2 font-medium flex items-center justify-center space-x-2 hover:bg-yellow-600 rounded-md"
            >
              <img src={logoutIcon} alt="Logout" className="w-5 h-5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Close icon */}
        <img
          src={closeIcon}
          alt="Close"
          className="absolute top-4 right-4 cursor-pointer md:hidden"
          onClick={() => setIsOpen(false)}
        />
      </aside>

      {addNewAdminPopup && <AddNewAdmin />}
      {settingPopup && <SettingPopup />}
    </>
  );
};

export default SideBar;
