// import React, { useState, useEffect } from "react";
// import logo from "../assets/black-logo.png";
// import logo_with_title from "../assets/logo-with-title.png";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { resetAuthSlice, login } from "../store/slice/authSlice";
// import { Navigate, Link } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();
//   const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     dispatch(login({ email, password }));
//   };

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(resetAuthSlice());
//     }
//   }, [error, dispatch]);

//   if (!loading && isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   return (
//     <div className="flex flex-col md:flex-row h-screen">
//       <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
//         <div className="max-w-sm w-full">
//           <div className="flex flex-col items-center mb-12">
//             <div className="rounded-full flex items-center justify-center mb-4">
//               <img src={logo} alt="logo" className="h-24 w-auto" />
//             </div>
//             <h1 className="text-4xl font-medium text-center mb-4 overflow-hidden">
//               Welcome Back !!
//             </h1>
//             <p className="text-gray-800 text-center mb-4">
//               Please enter your credentials to log in
//             </p>
//           </div>
//           <form onSubmit={handleLogin}>
//             <div className="mb-4 space-y-4">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//                 className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
//               />
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
//               />
//             </div>
//             {/* <Link to={"/password/forgot"} className="font-semibold rounded-md text-black mb-12 block">
//               Forgot Password?
//             </Link> */}
//             <Link to={"/forgot-password"} className="font-semibold rounded-md text-black mb-12 block">
//               Forgot Password? 
//             </Link>

//             <div className="block md:hidden font-semibold mt-5">
//               <p className="text-gray-800 mb-12">
//                 New to our Platform?{" "}
//                 <Link to={"/register"} className="text-sm text-gray-800 hover:underline">
//                   Sign Up
//                 </Link>
//               </p>
//             </div>
//             <button
//               type="submit"
//               className="border-2 mt-5 border-black w-full font-semibold bg-blue-400 text-white py-2 rounded-lg hover:bg-white hover:text-blue-300 transition"
//             >
//               SIGN IN
//             </button>
//           </form>
//         </div>
//       </div>
//       <div className="hidden md:flex w-1/2 bg-blue-400 text-white flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
//         <div className="text-center h-[400px] flex flex-col justify-center">
//           <div className="flex justify-center mb-12">
//             <img src={logo_with_title} alt="logo_with_title" className="mb-12 h-44 w-auto" />
//           </div>
//           <p className="text-gray-800 mb-12">New to our Platform? Sign up now.</p>
//           <Link
//             to={"/register"}
//             className="border-2 mt-5 border-white w-full font-semibold bg-blue-400 text-white px-8 py-2 rounded-lg hover:bg-white hover:text-blue-300 transition"
//           >
//             SIGN UP
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


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
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [error, dispatch]);

  if (!loading && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 overflow-hidden">
        <div className="max-w-sm w-full overflow-hidden">
          <div className="flex flex-col items-center mb-8">
            <div className="rounded-full flex items-center justify-center mb-4">
              <img src={logo} alt="logo" className="h-24 w-auto" />
            </div>
            <h1 className="text-4xl font-medium text-center mb-2">Welcome Back !!</h1>
            <p className="text-gray-800 text-center mb-4">
              Please enter your credentials to log in
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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

            <Link to={"/forgot-password"} className="font-semibold text-black block">
              Forgot Password?
            </Link>

            {/* Shown only on small screens */}
            <div className="block md:hidden font-semibold">
              <p className="text-gray-800">
                New to our Platform?{" "}
                <Link to={"/register"} className="text-sm text-gray-800 hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>

            <button
              type="submit"
              className="w-full font-semibold bg-blue-400 text-white py-2 rounded-lg hover:bg-white hover:text-blue-400 border-2 border-black transition"
            >
              SIGN IN
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Info + Signup */}
      <div className="hidden md:flex w-1/2 bg-blue-400 text-white flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px] overflow-hidden">
        <div className="text-center flex flex-col justify-center items-center">
          <div className="flex justify-center mb-8">
            <img src={logo_with_title} alt="logo_with_title" className="h-44 w-auto" />
          </div>
          <p className="text-gray-800 mb-8">New to our Platform? Sign up now.</p>
          <Link
            to={"/register"}
            className="border-2 mt-5 border-white w-full max-w-xs text-center font-semibold bg-blue-400 text-white px-8 py-2 rounded-lg hover:bg-white hover:text-blue-400 transition"
          >
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
