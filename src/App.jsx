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
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import Books from "./components/BookManagement";
import Catalog from "./components/Catalog";
import Users from "./components/Users";
import MyBorrowedBooks from "./components/MyBorrowedBooks";
import Header from "./layout/Header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [initializing, setInitializing] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  useEffect(() => {
    dispatch(getUser())
      .catch((error) => console.error("getUser failed:", error))
      .finally(() => setInitializing(false));
  }, [dispatch]);

  useEffect(() => {
    if (user?.role === "Admin") {
      setSelectedComponent("AdminDashboard");
    } else if (user?.role === "user") {
      setSelectedComponent("UserDashboard");
    }
  }, [user]);

  const renderComponent = () => {
    if (user?.role === "Admin") {
      switch (selectedComponent) {
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
      switch (selectedComponent) {
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
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <div className="flex w-full">
                <SideBar
                  setSelectedComponent={setSelectedComponent}
                  isSideBarOpen={isSideBarOpen}
                  setIsSideBarOpen={setIsSideBarOpen}
                />
                <div className="flex-1 relative min-h-screen">
                  <Header setIsSideBarOpen={setIsSideBarOpen} />
                  {renderComponent()}
                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="*"
          element={<div className="p-10 text-2xl text-center text-red-500">404 - Page Not Found</div>}
        />
      </Routes>
    </Router>
  );
};

export default App;