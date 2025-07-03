// ✅ Fixed BookManagement.jsx with proper fetchAllBooks & responsive modern UI
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBooks, deleteBook } from "../store/slice/bookSlice";
import { toggleAddBookPopup } from "../store/slice/popupSlice";
import AddBookPopup from "../popups/AddBookPopup";

const BookManagement = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.book);
  const { addBookPopup } = useSelector((state) => state.popup);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(id));
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Books Management</h2>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow"
          onClick={() => dispatch(toggleAddBookPopup())}
        >
          Add Book
        </button>
      </div>

      {/* Book List Table */}
      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left text-sm">
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Author</th>
                <th className="p-2 border hidden sm:table-cell">Description</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No books found.
                  </td>
                </tr>
              ) : (
                books.map((book) => (
                  <tr key={book._id} className="border-t text-sm">
                    <td className="p-2 border">{book.title}</td>
                    <td className="p-2 border">{book.author}</td>
                    <td className="p-2 border hidden sm:table-cell">
                      {book.description?.slice(0, 60)}...
                    </td>
                    <td className="p-2 border">{book.quantity}</td>
                    <td className="p-2 border">₹{book.price}</td>
                    <td className="p-2 border space-x-2">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                        onClick={() => handleDelete(book._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Popup */}
      {addBookPopup && <AddBookPopup />}
    </div>
  );
};

export default BookManagement;