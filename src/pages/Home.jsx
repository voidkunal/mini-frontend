import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SideBar from "../layout/SideBar.jsx";
import UserDashboard from "../components/UserDashboard.jsx";
import AdminDashboard from "../components/AdminDashboard.jsx";
import BookManagement from "../components/BookManagement.jsx";
import Catalog from "../components/Catalog.jsx";
import Users from "../components/Users.jsx";
import MyBorrowedBooks from "../components/MyBorrowedBooks.jsx";

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("");

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="relative md:pl-64 flex min-h-screen bg-gray-100">
      {/* Hamburger for small screens */}
      <div className="md:hidden z-10 absolute right-6 top-4 sm:top-6 flex justify-center items-center bg-pink-400 rounded-md h-9 w-9 text-white">
        <GiHamburgerMenu
          className="text-2xl"
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        />
      </div>

      <SideBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        setSelectedComponent={setSelectedComponent}
      />

      {/* Component Renderer */}
      {
        (() => {
          switch (selectedComponent) {
            case "Dashboard":
              return user?.role === "User" ? (
                <UserDashboard />
              ) : (
                <AdminDashboard />
              );

            case "Books":
              return <BookManagement />;

            case "Catalog":
              return user?.role === "Admin" ? <Catalog /> : null;

            case "Users":
              return user?.role === "Admin" ? <Users /> : null;

            case "My Borrowed Books":
              return <MyBorrowedBooks />;

            default:
              return user?.role === "User" ? (
                <UserDashboard />
              ) : (
                <AdminDashboard />
              );
          }
        })()
      }
    </div>
  );
};

export default Home;
