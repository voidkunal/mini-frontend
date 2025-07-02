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
    <main className="relative flex-1 p-6 pt-28 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <Header />

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800">📊 Admin Control Panel</h1>
        <p className="text-gray-600">Manage users, books, and monitor your library insights</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Pie Chart Section */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-between">
          <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">📈 Borrowing Stats</h2>
          <Pie data={data} options={{ cutout: 80 }} className="w-full h-64" />
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <span className="w-4 h-4 rounded-full bg-[#3D3E3E]"></span>
              Total Borrowed Books
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <span className="w-4 h-4 rounded-full bg-[#151619]"></span>
              Total Returned Books
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="flex flex-col gap-6 justify-center">
          <div className="flex items-center gap-4 p-5 rounded-xl bg-white shadow-xl hover:shadow-2xl transition">
            <div className="p-4 bg-yellow-100 rounded-lg">
              <img src={usersIcon} alt="Users" className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-3xl font-bold text-gray-900">{totalUsers}</h4>
              <p className="text-gray-600 text-sm">Total User Base</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-xl bg-white shadow-xl hover:shadow-2xl transition">
            <div className="p-4 bg-yellow-100 rounded-lg">
              <img src={bookIcon} alt="Books" className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-3xl font-bold text-gray-900">{totalBooks}</h4>
              <p className="text-gray-600 text-sm">Total Books Count</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-xl bg-white shadow-xl hover:shadow-2xl transition">
            <div className="p-4 bg-yellow-100 rounded-lg">
              <img src={adminIcon} alt="Admin" className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-3xl font-bold text-gray-900">{totalAdmin}</h4>
              <p className="text-gray-600 text-sm">Total Admins in Database</p>
            </div>
          </div>
        </div>

        {/* Admin Info + Quote */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center text-center">
            <img
              src={user?.avatar?.url || "https://via.placeholder.com/150"}
              alt="Admin Avatar"
              className="w-28 h-28 rounded-full object-cover shadow-md mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
            <p className="text-gray-600 text-sm mt-2">
              Welcome to your Admin Dashboard. Manage settings and monitor statistics.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md relative h-56 overflow-hidden">
            <p className="text-gray-700 text-sm leading-relaxed">
              “Your library is your paradise.” <br />
              A good system is not just shelves and books but who manages them.
              <br />
              Stay organized. Stay focused.
            </p>
            <p className="text-gray-500 text-xs absolute bottom-4 right-6">~ Void Tech Team</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
