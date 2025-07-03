import React, { useState, useEffect } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetAuthSlice, login } from "../store/slice/authSlice";
import { Navigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    dispatch(login(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [error, dispatch]);

  // ✅ Redirect to homepage after login, only after loading is done
  if (!loading && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
        <div className="max-w-sm w-full">
          <div className="flex flex-col items-center mb-12">
            <div className="rounded-full flex items-center justify-center mb-4">
              <img src={logo} alt="logo" className="h-24 w-auto" />
            </div>
            <h1 className="text-4xl font-medium text-center mb-4 overflow-hidden">
              Welcome Back !!
            </h1>
            <p className="text-gray-800 text-center mb-4">
              Please enter your credentials to log in
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4 space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
              />
            </div>
            <Link to={"/password/forgot"} className="font-semibold rounded-md text-black mb-12 block">
              Forgot Password?
            </Link>
            <div className="block md:hidden font-semibold mt-5">
              <p className="text-gray-800 mb-12">
                New to our Platform?{" "}
                <Link to={"/register"} className="text-sm text-gray-800 hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="border-2 mt-5 border-black w-full font-semibold bg-yellow-500 text-white py-2 rounded-lg hover:bg-white hover:text-yellow-300 transition"
            >
              SIGN IN
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex w-1/2 bg-yellow-500 text-white flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
        <div className="text-center h-[400px] flex flex-col justify-center">
          <div className="flex justify-center mb-12">
            <img src={logo_with_title} alt="logo_with_title" className="mb-12 h-44 w-auto" />
          </div>
          <p className="text-gray-800 mb-12">New to our Platform? Sign up now.</p>
          <Link
            to={"/register"}
            className="border-2 mt-5 border-white w-full font-semibold bg-yellow-500 text-white px-8 py-2 rounded-lg hover:bg-white hover:text-yellow-300 transition"
          >
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
