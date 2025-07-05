import React, { useState, useEffect } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { Navigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { otpVerification, resetAuthSlice } from "../store/slice/authSlice";
import { toast } from "react-toastify";

const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleOtpVerification = (e) => {
    e.preventDefault();
    dispatch(otpVerification(email, otp));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, message, error]);

  if (!email) return <Navigate to="/register" replace />;
  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
        <Link to={"/register"} className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -left-28 hover:bg-blue-400 hover:text-white transition duration-300 text-end">
          Back
        </Link>
        <div className="max-w-sm w-full">
          <div className="flex flex-col items-center mb-12">
            <div className="rounded-full flex items-center justify-center mb-4">
              <img src={logo} alt="logo" className="h-24 w-auto" />
            </div>
            <h1 className="text-4xl font-medium text-center mb-4">Check Your Mailbox</h1>
            <p className="text-gray-800 text-center mb-4">Please enter the OTP to proceed</p>
          </div>
          <form onSubmit={handleOtpVerification}>
            <div className="mb-4">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="OTP"
                required
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
              />
            </div>
            <button type="submit" disabled={loading} className="border-2 mt-5 border-black w-full font-semibold bg-blue-400 text-white py-2 rounded-lg hover:bg-white hover:text-blue-300 transition">
              {loading ? "Verifying..." : "VERIFY"}
            </button>
          </form>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 bg-blue-400 text-white flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
        <div className="text-center h-[400px] flex flex-col justify-center">
          <div className="flex justify-center mb-12">
            <img src={logo_with_title} alt="logo_with_title" className="mb-12 h-44 w-auto" />
          </div>
          <p className="text-gray-800 mb-12">New to our Platform? Sign up now.</p>
          <Link to="/register" className="border-2 mt-5 border-white w-full font-semibold bg-blue-400 text-white px-8 py-2 rounded-lg hover:bg-white hover:text-blue-300 transition text-center">
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OTP;
