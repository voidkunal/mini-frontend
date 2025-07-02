import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slice/authSlice";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import OTP from "./pages/OTP";
import ResetPassword from "./pages/ResetPassword";
import Contact from "./pages/Contact";
import LandingPage from "./pages/LandingPage";

import SideBar from "./layout/SideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import Books from "./components/BookManagement";
import Catalog from "./components/Catalog";
import Users from "./components/Users";
import MyBorrowedBooks from "./components/MyBorrowedBooks";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [initializing, setInitializing] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState(null);

  // ✅ Fetch user on app load (cookie will handle auth detection)
  useEffect(() => {
    dispatch(getUser())
      .catch((error) => {
        console.error("getUser failed:", error);
      })
      .finally(() => setInitializing(false));
  }, [dispatch]);

  // ✅ Set initial dashboard component
  useEffect(() => {
    if (user?.role === "Admin") {
      setSelectedComponent("AdminDashboard");
    } else if (user?.role === "user") {
      setSelectedComponent("UserDashboard");
    }
  }, [user]);

  // ✅ Dynamic render content based on role
  const renderComponent = () => {
    if (user?.role === "Admin") {
      switch (selectedComponent || "AdminDashboard") {
        case "AdminDashboard":
          return <AdminDashboard />;
        case "Books":
          return <Books />;
        case "Catalog":
          return <Catalog />;
        case "Users":
          return <Users />;
        default:
          return <AdminDashboard />;
      }
    } else if (user?.role === "user") {
      switch (selectedComponent || "UserDashboard") {
        case "UserDashboard":
          return <UserDashboard />;
        case "Books":
          return <Books />;
        case "My Borrowed Books":
          return <MyBorrowedBooks />;
        default:
          return <UserDashboard />;
      }
    } else {
      return <div className="text-red-600 font-bold p-4">Unauthorized role</div>;
    }
  };

  if (initializing) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-medium">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer theme="colored" />
      <Routes>
        <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="*" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/otp-verification/:email" element={<OTP />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="*"
          element={
            isAuthenticated ? (
              <div className="flex">
                <SideBar
                  setSelectedComponent={setSelectedComponent}
                  isSideBarOpen={true}
                  setIsSideBarOpen={() => {}}
                />
                <main className="flex-1 ml-64 p-6">{renderComponent()}</main>
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
