import React, { useEffect } from "react";
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

const SideBar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent }) => {
  const dispatch = useDispatch();
  const { addNewAdminPopup, settingPopup } = useSelector((state) => state.popup || {});
  const { loading, error, message, isAuthenticated, user } = useSelector((state) => state.auth);

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
      <aside
        className={`${
          isSideBarOpen ? "left-0" : "-left-full"
        } z-10 transition-all duration-700 md:relative md:left-0 flex w-64 bg-yellow-500 text-white flex-col h-full fixed`}
      >
        <div className="px-6 py-4 my-8">
          <img src={logo_with_title} alt="logo" />
        </div>

        <nav className="flex-1 px-6 space-y-2">
          <button
            onClick={() => setSelectedComponent("Dashboard")}
            className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2"
          >
            <img src={dashboardIcon} alt="dashboard" /> <span>Dashboard</span>
          </button>

          <button
            onClick={() => setSelectedComponent("Books")}
            className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2"
          >
            <img src={bookIcon} alt="Books" /> <span>Books</span>
          </button>

          {isAuthenticated && user?.role === "Admin" && (
            <>
              <button
                onClick={() => setSelectedComponent("Users")}
                className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2"
              >
                <img src={usersIcon} alt="users" /> <span>Users</span>
              </button>

              <button
                onClick={() => dispatch(toggleAddNewAdminPopup())}
                className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2"
              >
                <RiAdminFill className="w-6 h-6" /> <span>Add New Admin</span>
              </button>
            </>
          )}

          <button
            onClick={() => dispatch(toggleSettingPopup())}
            className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2"
          >
            <img src={settingIcon} alt="setting" />
            <span>Update Credentials</span>
          </button>
        </nav>

        <div className="px-6 py-4 mt-auto">
          <Link
            to="/contact"
            className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2"
          >
            <img src={contactIcon} alt="contact" />
            <span>Contact</span>
          </Link>
        </div>

        <div className="px-6 py-4">
          <button
            onClick={handleLogout}
            className="py-2 font-medium text-center bg-transparent rounded-md flex items-center justify-center space-x-5 mb-7 mx-auto w-fit"
          >
            <img src={logoutIcon} alt="logout" /> <span>Log Out</span>
          </button>
        </div>

        <img
          src={closeIcon}
          alt="closeIcon"
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="h-fit w-fit absolute top-0 right-4 mt-4 block md:hidden cursor-pointer"
        />
      </aside>

      {addNewAdminPopup && <AddNewAdmin />}
      {settingPopup && <SettingPopup />}
    </>
  );
};

export default SideBar;
