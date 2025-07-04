// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import heroImage from "../assets/hero.jpg";

// const LandingPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-yellow-400 flex items-center justify-center px-6 text-white">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center max-w-5xl w-full flex flex-col md:flex-row items-center gap-10"
//       >
       
//         <img
//           src={heroImage}
//           alt="Hero Visual"
//           className="w-full md:w-72 h-auto object-cover rounded-xl shadow-xl"
//         />

        
//         <div className="flex-1">
//           <h1 className="text-5xl font-extrabold mb-4 text-white drop-shadow-sm">
//             Welcome to <span className="text-blue-300">Study Era</span>
//           </h1>
//           <p className="text-lg mb-8 text-gray-200">
//           Smart library management system Application for Rural Students.
//           </p>

//           <div className="flex flex-col sm:flex-row justify-center gap-5">
//             <button
//               onClick={() => navigate("/login")}
//               className="bg-blue-400 hover:bg-blue-300 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-md"
//             >
//               Get Started
//             </button>
//             <button
//               onClick={() => navigate("/contact")}
//               className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-full border border-white/40 transition-all duration-300"
//             >
//               Contact
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default LandingPage;


import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "../assets/hero.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-yellow-400 flex items-center justify-center px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-lg p-6 sm:p-10 rounded-3xl shadow-xl w-full max-w-5xl flex flex-col md:flex-row items-center gap-8 md:gap-12"
        style={{
          maxHeight: "90vh",       // Limits height of the box
          overflow: "hidden",      // Prevents scroll INSIDE this box
        }}
      >
        {/* Hero Image */}
        <img
          src={heroImage}
          alt="Hero"
          className="w-64 h-64 object-cover rounded-xl shadow-lg"
          style={{ flexShrink: 0 }}
        />

        {/* Text Section */}
        <div
          className="flex-1 text-center md:text-left"
          style={{
            overflow: "hidden",      // Prevent internal scrollbars
            maxHeight: "100%",       // Enforce height limit
          }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white leading-tight break-words">
            Welcome to <span className="text-blue-300">Study Era</span>
          </h1>
          <p className="text-base sm:text-lg mb-8 text-gray-200">
            Smart library management system Application for Rural Students.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-400 hover:bg-blue-300 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-full border border-white/30 transition-all duration-300"
            >
              Contact
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;

