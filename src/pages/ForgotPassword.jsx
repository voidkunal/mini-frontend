import React, { useState, useEffect } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resetAuthSlice } from "../store/slice/authSlice";
import { toast } from "react-toastify";
import { Navigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }

    if (error) {
      const errorMsg =
        typeof error === "string"
          ? error
          : error?.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, message, error]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col justify-center md:flex-row h-screen">
     
      <div className="hidden w-full md:w-1/2 bg-blue-400 text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
        <div className="text-center h-[450px]">
          <div className="flex justify-center mb-12">
            <img
              src={logo_with_title}
              alt="logo_with_title"
              className="mb-12 h-44 w-auto"
            />
          </div>
          <h3 className="text-gray-800 mb-12 max-w-[320px] mx-auto text-3xl font-medium leading-10">
            "Your own digital bibliothecas for borrowing and watching videos"
          </h3>
        </div>
      </div>

    
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
        <Link
          to="/login"
          className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -left-28 hover:bg-blue-400 hover:text-white transition duration-300 hidden md:block"
        >
          Back
        </Link>

        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-12">
            <img src={logo} alt="logo" className="h-24 w-auto" />
          </div>

          <h1 className="text-4xl font-medium text-center mb-5 overflow-hidden">
            Forgot Password
          </h1>
          <p className="text-gray-800 text-center mb-12">
            Please enter your registered email
          </p>

          <form onSubmit={handleForgotPassword}>
            <div className="mb-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="border-2 mt-5 border-black w-full font-semibold bg-blue-400 text-white py-2 rounded-lg hover:bg-white hover:text-blue-400 transition"
              disabled={loading}
            >
              {loading ? "Processing..." : "RESET PASSWORD"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
