import React, { useEffect, useState } from "react";
import { BookA, NotebookPen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchAllBooks,
  resetBookSlice,
} from "../store/slice/bookSlice";
import {
  fetchUsersBorrowedBooks,
  resetBorrowSlice,
} from "../store/slice/borrowSlice";
import {
  toggleAddBookPopup,
  toggleReadBookPopup,
  toggleRecordBookPopup,
} from "../store/slice/popupSlice";
import Header from "../layout/Header";
import AddBookPopup from "../popups/AddBookPopup";
import ReadBookPopup from "../popups/ReadBookPopup";
import RecordBookPopup from "../popups/RecordPopup";

const BookManagement = () => {
  const dispatch = useDispatch();

  const { loading, error, message, books = [] } = useSelector((state) => state.book);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { addBookPopup, readBookPopup, recordBookPopup } = useSelector((state) => state.popup);
  const { message: borrowMessage, error: borrowError } = useSelector((state) => state.borrow);

  const [readBook, setReadBook] = useState(null);
  const [borrowBookId, setBorrowBookId] = useState("");
  const [searchedKeyword, setSearchedKeyword] = useState("");

  useEffect(() => {
    dispatch(fetchAllBooks());
    if (isAuthenticated && user?.role !== "Admin") {
      dispatch(fetchUsersBorrowedBooks());
    }
  }, [dispatch, isAuthenticated, user?.role]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetBookSlice());
    } else if (borrowMessage) {
      toast.success(borrowMessage);
      dispatch(resetBorrowSlice());
    }

    if (error) {
      toast.error(error);
      dispatch(resetBookSlice());
    } else if (borrowError) {
      toast.error(borrowError);
      dispatch(resetBorrowSlice());
    }
  }, [message, error, borrowMessage, borrowError, dispatch]);

  const openReadPopup = (id) => {
    const book = books.find((b) => b._id === id);
    if (book) {
      setReadBook(book);
      dispatch(toggleReadBookPopup());
    }
  };

  const openRecordBookPopup = (id) => {
    setBorrowBookId(id);
    dispatch(toggleRecordBookPopup());
  };

  const handleSearch = (e) => setSearchedKeyword(e.target.value.toLowerCase());

  const searchedBooks = books.filter((book) =>
    book?.title?.toLowerCase().includes(searchedKeyword)
  );

  return (
    <>
      <main className="relative flex-1 p-6 pt-28 bg-gray-100 min-h-screen">
        <Header />

        {/* Header Section */}
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <div className="flex flex-col sm:flex-row w-full sm:items-center gap-3">
            <h2 className="text-2xl font-semibold">
              {user?.role === "Admin" ? "📚 Book Management" : "📘 Books"}
            </h2>

            {isAuthenticated && user?.role === "Admin" && (
              <button
                onClick={() => dispatch(toggleAddBookPopup())}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-gray-800 transition"
              >
                ➕ Add Book
              </button>
            )}

            <input
              type="text"
              placeholder="🔍 Search books..."
              className="w-full sm:w-64 border p-2 border-gray-300 rounded-md"
              value={searchedKeyword}
              onChange={handleSearch}
            />
          </div>
        </header>

        {/* Book Table Section */}
        {searchedBooks?.length > 0 ? (
          <div className="mt-6 overflow-auto bg-white rounded-md shadow-md">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-300 text-left text-sm font-semibold">
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Author</th>
                  {user?.role === "Admin" && <th className="px-4 py-2">Qty</th>}
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Availability</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchedBooks.map((book, idx) => (
                  <tr
                    key={book._id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">{book.title}</td>
                    <td className="px-4 py-2">{book.author}</td>
                    {user?.role === "Admin" && (
                      <td className="px-4 py-2">{book.quantity}</td>
                    )}
                    <td className="px-4 py-2">₹{book.price}</td>
                    <td className="px-4 py-2">
                      {book.availability ? "✅ Available" : "❌ Unavailable"}
                    </td>
                    <td className="px-4 py-2 flex justify-center gap-4">
                      <BookA
                        onClick={() => openReadPopup(book._id)}
                        className="cursor-pointer text-blue-600 hover:scale-110 transition"
                      />
                      {user?.role === "Admin" && (
                        <NotebookPen
                          onClick={() => openRecordBookPopup(book._id)}
                          className="cursor-pointer text-green-600 hover:scale-110 transition"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-600 text-xl mt-10">
            No books found in the library.
          </div>
        )}
      </main>

      {/* Popups */}
      {addBookPopup && <AddBookPopup />}
      {readBookPopup && readBook && <ReadBookPopup book={readBook} />}
      {recordBookPopup && borrowBookId && <RecordBookPopup bookId={borrowBookId} />}
    </>
  );
};

export default BookManagement;
