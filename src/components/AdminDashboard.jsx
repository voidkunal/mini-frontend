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
  const { allRecords: allBorrowedBooks = [] } = useSelector((state) => state.borrow);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    dispatch(fetchUsersBorrowedBooks());
  }, [dispatch]);

  useEffect(() => {
    const numberOfUsers = users?.filter((u) => u.role === "user") || [];
    const numberOfAdmins = users?.filter((u) => u.role === "Admin") || [];

    setTotalUsers(numberOfUsers.length);
    setTotalAdmin(numberOfAdmins.length);
    setTotalBooks(books?.length || 0);

    const numberOfTotalBorrowedBooks =
      allBorrowedBooks?.filter((book) => book.returned === null) || [];

    const numberOfTotalReturnedBooks =
      allBorrowedBooks?.filter((book) => book.returnDate !== null) || [];

    setTotalBorrowedBooks(numberOfTotalBorrowedBooks.length);
    setTotalReturnedBooks(numberOfTotalReturnedBooks.length);
  }, [users, books, allBorrowedBooks]);

  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3D3E3E", "#151619"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <main className="relative flex-1 p-4 md:p-6 pt-24 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <Header />

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800">📊 Admin Control Panel</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Manage users, books, and monitor your library insights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart Section */}
        <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center">
          <h2 className="text-lg md:text-xl font-semibold text-center text-gray-800 mb-4">
            📈 Borrowing Stats
          </h2>
          <div className="w-full max-w-xs md:max-w-sm">
            <Pie data={data} options={{ cutout: 80 }} />
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="w-4 h-4 rounded-full bg-[#3D3E3E]"></span>
              Total Borrowed Books
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="w-4 h-4 rounded-full bg-[#151619]"></span>
              Total Returned Books
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col gap-6 justify-center">
          {[{
            icon: usersIcon,
            label: "Total User Base",
            value: totalUsers
          }, {
            icon: bookIcon,
            label: "Total Books Count",
            value: totalBooks
          }, {
            icon: adminIcon,
            label: "Total Admins in Database",
            value: totalAdmin
          }].map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="p-3 bg-yellow-100 rounded-lg">
                <img src={stat.icon} alt={stat.label} className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-gray-900">{stat.value}</h4>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Admin Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <img
              src={user?.avatar?.url || "https://via.placeholder.com/150"}
              alt="Admin Avatar"
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4 shadow"
            />
            <h2 className="text-lg font-semibold text-gray-800">{user?.name}</h2>
            <p className="text-gray-600 text-sm mt-1">
              Welcome to your Admin Dashboard.
              <br />Manage settings and monitor statistics.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md relative h-48">
            <p className="text-gray-700 text-sm leading-relaxed">
              “Your library is your paradise.”<br />
              A good system is not just shelves and books but who manages them.<br />
              Stay organized. Stay focused.
            </p>
            <p className="text-gray-500 text-xs absolute bottom-3 right-4">~ Void Tech Team</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;