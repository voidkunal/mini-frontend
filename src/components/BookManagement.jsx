import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../store/slice/bookSlice";
import { toggleAddBookPopup } from "../store/slice/popupSlice";
import AddBookPopup from "../popups/AddBookPopup";
import ReadBookPopup from "../popups/ReadBookPopup";
import RecordBookPopup from "../popups/RecordBookPopup";
import { FaBookOpen, FaEdit, FaPlus } from "react-icons/fa";

const BookManagement = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.books);
  const { addBookPopup, readBookPopup, recordBookPopup } = useSelector(
    (state) => state.popup
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          📚 Book Management
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <button
            className="flex items-center gap-2 bg-yellow-500 text-white font-semibold px-4 py-2 rounded hover:bg-yellow-600"
            onClick={() => dispatch(toggleAddBookPopup())}
          >
            <FaPlus />
            Add Book
          </button>

          <input
            type="text"
            placeholder="🔍 Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded-md w-full sm:w-64"
          />
        </div>
      </div>

      {/* Book Table */}
      {loading ? (
        <p className="text-gray-600 text-center">Loading books...</p>
      ) : filteredBooks.length === 0 ? (
        <p className="text-center text-gray-600">No books found in the library.</p>
      ) : (
        <div className="overflow-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Author</th>
                <th className="py-3 px-4 text-center">Qty</th>
                <th className="py-3 px-4 text-center">Price</th>
                <th className="py-3 px-4 text-center">Availability</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr
                  key={book._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{book.title}</td>
                  <td className="py-2 px-4">{book.author}</td>
                  <td className="py-2 px-4 text-center">{book.quantity}</td>
                  <td className="py-2 px-4 text-center">₹{book.price}</td>
                  <td className="py-2 px-4 text-center">
                    {book.quantity > 0 ? "Available" : "Out of Stock"}
                  </td>
                  <td className="py-2 px-4 text-center flex justify-center gap-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        // Dispatch or open read popup here
                      }}
                    >
                      <FaBookOpen size={18} />
                    </button>
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() => {
                        // Dispatch or open record/edit popup here
                      }}
                    >
                      <FaEdit size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Popups */}
      {addBookPopup && <AddBookPopup />}
      {readBookPopup && <ReadBookPopup />}
      {recordBookPopup && <RecordBookPopup />}
    </div>
  );
};

export default BookManagement;
