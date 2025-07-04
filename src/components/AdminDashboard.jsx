
// // ✅ AdminDashboard.jsx (Improved UI + Responsive)
// import React, { useEffect, useState } from "react";
// import adminIcon from "../assets/pointing.png";
// import usersIcon from "../assets/people-black.png";
// import bookIcon from "../assets/book-square.png";
// import { Pie } from "react-chartjs-2";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   LineElement,
//   PointElement,
//   ArcElement,
// } from "chart.js";
// import Header from "../layout/Header";
// import { fetchUsersBorrowedBooks } from "../store/slice/borrowSlice";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   LineElement,
//   PointElement,
//   ArcElement
// );

// const AdminDashboard = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { users } = useSelector((state) => state.user);
//   const { books } = useSelector((state) => state.book);
//   const { allRecords: allBorrowedBooks = [] } = useSelector((state) => state.borrow);

//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalAdmin, setTotalAdmin] = useState(0);
//   const [totalBooks, setTotalBooks] = useState(0);
//   const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
//   const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

//   useEffect(() => {
//     dispatch(fetchUsersBorrowedBooks());
//   }, [dispatch]);

//   useEffect(() => {
//     const userCount = users?.filter((u) => u.role === "user").length || 0;
//     const adminCount = users?.filter((u) => u.role === "Admin").length || 0;
//     const borrowedCount = allBorrowedBooks?.filter((b) => b.returned === null).length || 0;
//     const returnedCount = allBorrowedBooks?.filter((b) => b.returnDate !== null).length || 0;

//     setTotalUsers(userCount);
//     setTotalAdmin(adminCount);
//     setTotalBooks(books?.length || 0);
//     setTotalBorrowedBooks(borrowedCount);
//     setTotalReturnedBooks(returnedCount);
//   }, [users, books, allBorrowedBooks]);

//   const data = {
//     labels: ["Total Borrowed Books", "Total Returned Books"],
//     datasets: [
//       {
//         data: [totalBorrowedBooks, totalReturnedBooks],
//         backgroundColor: ["#3D3E3E", "#151619"],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   return (
//     <main className="relative flex-1 p-4 pt-24 sm:pt-28 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
//       <Header />

//       <div className="mb-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-800">📊 Admin Control Panel</h1>
//         <p className="text-gray-600 text-sm sm:text-base">Manage users, books, and monitor your library insights</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Chart */}
//         <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center">
//           <h2 className="text-lg font-semibold mb-4 text-gray-800">📈 Borrowing Stats</h2>
//           <div className="w-full max-w-xs">
//             <Pie data={data} options={{ cutout: 60 }} />
//           </div>
//           <div className="mt-6 text-sm text-gray-700 space-y-2">
//             <div className="flex items-center gap-2">
//               <span className="w-4 h-4 bg-[#3D3E3E] rounded-full"></span> Borrowed Books
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="w-4 h-4 bg-[#151619] rounded-full"></span> Returned Books
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="flex flex-col gap-6 justify-center">
//           <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow hover:shadow-xl transition">
//             <div className="p-3 bg-yellow-100 rounded-lg">
//               <img src={usersIcon} alt="Users" className="w-6 h-6" />
//             </div>
//             <div>
//               <h4 className="text-2xl font-bold text-gray-800">{totalUsers}</h4>
//               <p className="text-gray-500 text-sm">Total Users</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow hover:shadow-xl transition">
//             <div className="p-3 bg-yellow-100 rounded-lg">
//               <img src={bookIcon} alt="Books" className="w-6 h-6" />
//             </div>
//             <div>
//               <h4 className="text-2xl font-bold text-gray-800">{totalBooks}</h4>
//               <p className="text-gray-500 text-sm">Total Books</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow hover:shadow-xl transition">
//             <div className="p-3 bg-yellow-100 rounded-lg">
//               <img src={adminIcon} alt="Admins" className="w-6 h-6" />
//             </div>
//             <div>
//               <h4 className="text-2xl font-bold text-gray-800">{totalAdmin}</h4>
//               <p className="text-gray-500 text-sm">Admins Count</p>
//             </div>
//           </div>
//         </div>

//         {/* Profile & Quote */}
//         <div className="space-y-6">
//           <div className="bg-white p-6 rounded-xl shadow text-center flex flex-col items-center">
//             <img
//               src={user?.avatar?.url || "https://via.placeholder.com/150"}
//               alt="Admin Avatar"
//               className="w-24 h-24 rounded-full object-cover mb-3"
//             />
//             <h3 className="text-lg font-semibold text-gray-800">{user?.name}</h3>
//             <p className="text-gray-500 text-sm">Welcome to your Admin Dashboard</p>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow text-sm text-gray-600 relative h-48 flex flex-col justify-between">
//             <p>
//               "Your library is your paradise." <br />
//               A good system isn't just shelves and books—it's who manages them.
//               <br />
//               Stay organized. Stay focused.
//             </p>
//             <p className="text-right text-xs text-gray-400">~ Void Tech Team</p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default AdminDashboard;


// ✅ AdminDashboard.jsx (Fixed Pie Chart + Renamed Stats)
import React, { useEffect, useState } from "react";
import adminIcon from "../assets/pointing.png";
import usersIcon from "../assets/people-black.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import Header from "../layout/Header";
import { fetchUsersBorrowedBooks } from "../store/slice/borrowSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.book);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [addedBooks, setAddedBooks] = useState(0);
  const [removedBooks, setRemovedBooks] = useState(0);

  useEffect(() => {
    dispatch(fetchUsersBorrowedBooks());
  }, [dispatch]);

  useEffect(() => {
    const userCount = users?.filter((u) => u.role === "user").length || 0;
    const adminCount = users?.filter((u) => u.role === "Admin").length || 0;

    // Assuming quantity > 0 = added, quantity === 0 = removed (mock logic)
    const added = books?.filter((b) => b.quantity > 0).length || 0;
    const removed = books?.filter((b) => b.quantity === 0).length || 0;

    setTotalUsers(userCount);
    setTotalAdmin(adminCount);
    setTotalBooks(books?.length || 0);
    setAddedBooks(added);
    setRemovedBooks(removed);
  }, [users, books]);

  const data = {
    labels: ["Total Added Books", "Total Removed Books"],
    datasets: [
      {
        data: [addedBooks, removedBooks],
        backgroundColor: ["#3D3E3E", "#151619"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <main className="relative flex-1 p-4 pt-24 sm:pt-28 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <Header />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Admin Control Panel</h1>
        <p className="text-gray-600 text-sm sm:text-base">Manage users, books, and monitor your library insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center min-h-[380px]">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Books Stats</h2>
          <div className="w-full flex justify-center items-center min-h-[250px]">
            <Pie
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      usePointStyle: true,
                      padding: 20,
                    },
                  },
                },
              }}
              width={250}
              height={250}
            />
          </div>
          <div className="mt-6 text-sm text-gray-700 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#3D3E3E] rounded-full"></span> Added Books
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#151619] rounded-full"></span> Removed Books
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-6 justify-center">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow hover:shadow-xl transition">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <img src={usersIcon} alt="Users" className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-800">{totalUsers}</h4>
              <p className="text-gray-500 text-sm">Total Users</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow hover:shadow-xl transition">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <img src={bookIcon} alt="Books" className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-800">{totalBooks}</h4>
              <p className="text-gray-500 text-sm">Total Books</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow hover:shadow-xl transition">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <img src={adminIcon} alt="Admins" className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-800">{totalAdmin}</h4>
              <p className="text-gray-500 text-sm">Admins Count</p>
            </div>
          </div>
        </div>

        {/* Profile & Quote */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow text-center flex flex-col items-center">
            <img
              src={user?.avatar?.url || "https://via.placeholder.com/150"}
              alt="Admin Avatar"
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800">{user?.name}</h3>
            <p className="text-gray-500 text-sm">Welcome to your Admin Dashboard</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-sm text-gray-600 relative h-48 flex flex-col justify-between">
            <p>
              "Your library is your paradise." <br />
              A good system isn't just shelves and books—it's who manages them.
              <br />
              Stay organized. Stay focused.
            </p>
            <p className="text-right text-xs text-gray-400">~ Void Tech Team</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
