import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePopup } from "../store/slice/popupSlice";
import { addBook, resetBookSlice } from "../store/slice/bookSlice";

const AddBookPopup = () => {
  const dispatch = useDispatch();

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    quantity: "",
    price: "",
    file: null,
  });

  const { loading, message } = useSelector((state) => state.book);

  useEffect(() => {
    if (message) {
      dispatch(closePopup("addBookPopup"));
      dispatch(resetBookSlice());
    }
  }, [message, dispatch]);

  const handleClose = () => {
    dispatch(closePopup("addBookPopup"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", bookData.title);
    formData.append("author", bookData.author);
    formData.append("description", bookData.description);
    formData.append("quantity", bookData.quantity);
    formData.append("price", bookData.price);
    if (bookData.file) {
      formData.append("file", bookData.file);
    }

    dispatch(addBook(formData));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4 sm:px-0">
      <div className="bg-white w-full max-w-lg p-6 sm:p-8 rounded-xl shadow-lg relative">
        
        <button
          className="absolute top-4 right-4 text-gray-600 text-xl hover:text-red-500"
          onClick={handleClose}
        >
          &times;
        </button>

       
        <h2 className="text-2xl font-semibold text-center mb-6">Add New Book</h2>

        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={bookData.title}
              onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
              required
              className="w-full p-2 border rounded-md focus:outline-blue-400"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <input
              type="text"
              value={bookData.author}
              onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
              required
              className="w-full p-2 border rounded-md focus:outline-blue-400"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              rows="3"
              value={bookData.description}
              onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
              required
              className="w-full p-2 border rounded-md focus:outline-blue-400 resize-none"
            />
          </div>

          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={bookData.quantity}
                onChange={(e) => setBookData({ ...bookData, quantity: e.target.value })}
                required
                className="w-full p-2 border rounded-md focus:outline-blue-400"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Price (₹)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={bookData.price}
                onChange={(e) => setBookData({ ...bookData, price: e.target.value })}
                required
                className="w-full p-2 border rounded-md focus:outline-blue-400"
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Upload File</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setBookData({ ...bookData, file: e.target.files[0] })}
              className="w-full p-2 border rounded-md focus:outline-blue-400"
            />
            {bookData.file && (
              <p className="text-sm text-gray-600 mt-1">Selected: {bookData.file.name}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 transition"
            >
              {loading ? "Uploading..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookPopup;
