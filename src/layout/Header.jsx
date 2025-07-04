// // src/components/Header.jsx
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
//     <header className="fixed top-0 left-0 w-full z-50 bg-white shadow px-6 py-3 flex justify-between items-center">
//       <h1 className="text-xl font-bold text-gray-800">📚 Void Library</h1>
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


// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";

const Header = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", {
        hour: "numeric", minute: "2-digit", hour12: true
      }));
      setDate(now.toLocaleDateString("en-US", {
        month: "short", year: "numeric"
      }));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-64 w-[calc(100%-16rem)] z-40 bg-white shadow px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">📚 Study Era</h1>
      <div className="flex items-center gap-4 text-sm sm:text-base text-gray-700">
        <span>{time}</span>
        <span className="border-l h-4 border-gray-300"></span>
        <span>{date}</span>
        <FaCog className="text-lg sm:text-xl cursor-pointer hover:text-black" />
      </div>
    </header>
  );
};

export default Header;
