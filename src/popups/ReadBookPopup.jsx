import React from "react";
import { useDispatch } from "react-redux";
import { closePopup } from "../store/slice/popupSlice";

const ReadBookPopup = ({ book }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closePopup("readBookPopup"));
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fileUrl = book?.bookFile
    ? `${backendUrl}/uploads/${book.bookFile}`
    : book?.filePath
    ? `${backendUrl}/${book.filePath}`
    : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl w-full relative overflow-y-auto max-h-[90vh]">
        {/* ❌ Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-500"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-1">{book?.title}</h2>
        <p className="text-gray-600 mb-3">
          <strong>Author:</strong> {book?.author}
        </p>

        {fileUrl ? (
          fileUrl.endsWith(".pdf") ? (
            <iframe
              src={fileUrl}
              title="PDF Preview"
              className="w-full h-[600px] border rounded"
            ></iframe>
          ) : (
            <img
              src={fileUrl}
              alt="Book Preview"
              className="w-full max-h-[600px] object-contain rounded border"
            />
          )
        ) : (
          <p className="text-red-500">⚠️ No book file uploaded.</p>
        )}
      </div>
    </div>
  );
};

export default ReadBookPopup;
