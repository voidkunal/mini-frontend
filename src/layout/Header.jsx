// import React, { useEffect, useState } from "react";
// import { FaCog } from "react-icons/fa";

// const Header = () => {
//   const [time, setTime] = useState("");
//   const [date, setDate] = useState("");

//   useEffect(() => {
//     const updateDateTime = () => {
//       const now = new Date();
//       setTime(now.toLocaleTimeString("en-US", {
//         hour: "numeric", minute: "2-digit", hour12: true
//       }));
//       setDate(now.toLocaleDateString("en-US", {
//         month: "short", year: "numeric"
//       }));
//     };

//     updateDateTime();
//     const interval = setInterval(updateDateTime, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <header className="fixed top-0 left-64 w-[calc(100%-16rem)] z-40 bg-white shadow px-6 py-3 flex justify-between items-center">
//       <h1 className="text-xl font-bold text-gray-800">📚 Study Era</h1>
//       <div className="flex items-center gap-4 text-sm sm:text-base text-gray-700">
//         <span>{time}</span>
//         <span className="border-l h-4 border-gray-300"></span>
//         <span>{date}</span>
//         <FaCog className="text-lg sm:text-xl cursor-pointer hover:text-black" />
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import { useSelector } from "react-redux";
import { Settings } from "lucide-react";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white shadow px-4 py-3 flex flex-col sm:flex-row items-center justify-between sm:pl-64 gap-2">
      {/* Logo and App Name */}
      <div className="flex items-center gap-2 text-xl font-semibold whitespace-nowrap">
        <span role="img" aria-label="books">
          📚
        </span>
        <span>Study Era</span>
      </div>

      {/* Time, Date, and Settings */}
      <div className="flex items-center gap-4 text-sm text-gray-700 whitespace-nowrap">
        <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        <span>{new Date().toLocaleString("default", { month: "short" })} {new Date().getFullYear()}</span>
        {isAuthenticated && (
          <Settings className="w-5 h-5 cursor-pointer hover:text-gray-900" />
        )}
      </div>
    </header>
  );
};

export default Header;
