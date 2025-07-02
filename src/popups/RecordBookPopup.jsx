import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePopup } from "../store/slice/popupSlice";
import { deleteBook } from "../store/slice/bookSlice";
import { toast } from "react-toastify";

const RecordPopup = ({ bookId, setSelectedComponent }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.book);

  const handleCloseAndRedirect = () => {
    dispatch(closePopup("recordBookPopup"));
    if (setSelectedComponent) setSelectedComponent("Books");
  };

  const handleDelete = async () => {
    try {
      const result = await dispatch(deleteBook(bookId));

      if (result?.payload?.success) {
        toast.success(result.payload.message || "Book deleted successfully");
        handleCloseAndRedirect();
      } else {
        toast.error(result?.payload?.message || "Failed to delete book");
      }
    } catch (err) {
      toast.error("Unexpected error during deletion.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full relative">
        <button
          onClick={handleCloseAndRedirect}
          className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-500"
        >
          ×
        </button>

        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this book?
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleCloseAndRedirect}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm disabled:bg-red-300"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordPopup;
