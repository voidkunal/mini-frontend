// ✅ Final Responsive BookManagement.jsx with correct UI layout
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks, deleteBook } from "../store/slice/bookSlice";
import { toggleAddBookPopup } from "../store/slice/popupSlice";
import AddBookPopup from "../popups/AddBookPopup";

const BookManagement = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.book);
  const { addBookPopup } = useSelector((state) => state.popup);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(id));
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 sm:mb-0">Book Management</h2>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow"
            onClick={() => dispatch(toggleAddBookPopup())}
          >
            Add Book
          </button>
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full sm:w-64"
          />
        </div>
      </div>

      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left text-sm">#</th>
                <th className="py-2 px-4 text-left text-sm">Title</th>
                <th className="py-2 px-4 text-left text-sm">Author</th>
                <th className="py-2 px-4 text-left text-sm">Qty</th>
                <th className="py-2 px-4 text-left text-sm">Price</th>
                <th className="py-2 px-4 text-left text-sm">Availability</th>
                <th className="py-2 px-4 text-left text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No books found.
                  </td>
                </tr>
              ) : (
                filteredBooks.map((book, index) => (
                  <tr key={book._id} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-4 text-sm">{index + 1}</td>
                    <td className="py-2 px-4 text-sm">{book.title}</td>
                    <td className="py-2 px-4 text-sm">{book.author}</td>
                    <td className="py-2 px-4 text-sm">{book.quantity}</td>
                    <td className="py-2 px-4 text-sm">₹{book.price}</td>
                    <td className="py-2 px-4 text-sm text-green-600">Available</td>
                    <td className="py-2 px-4 text-sm space-x-2">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                        onClick={() => handleDelete(book._id)}
                      >
                        Delete
                      </button>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs">
                        View
                      </button>
                      <button className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 text-xs">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {addBookPopup && <AddBookPopup />}
    </div>
  );
};

export default BookManagement;