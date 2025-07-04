// // ✅ Final Fixed BookManagement.jsx for Production (Vercel + HTTPS + Auth Cookies)
// import React, { useEffect, useState } from "react";
// import { BookA, NotebookPen } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import {
//   fetchAllBooks,
//   resetBookSlice,
// } from "../store/slice/bookSlice";
// import {
//   fetchUsersBorrowedBooks,
//   resetBorrowSlice,
// } from "../store/slice/borrowSlice";
// import {
//   toggleAddBookPopup,
//   toggleReadBookPopup,
//   toggleRecordBookPopup,
// } from "../store/slice/popupSlice";
// import Header from "../layout/Header";
// import AddBookPopup from "../popups/AddBookPopup";
// import ReadBookPopup from "../popups/ReadBookPopup";
// import RecordBookPopup from "../popups/RecordBookPopup";

// const BookManagement = () => {
//   const dispatch = useDispatch();
//   const { loading, error, message, books } = useSelector((state) => state.book);
//   const { isAuthenticated, user } = useSelector((state) => state.auth);
//   const { addBookPopup, readBookPopup, recordBookPopup } = useSelector((state) => state.popup);
//   const {
//     message: borrowSliceMessage,
//     error: borrowSliceError,
//   } = useSelector((state) => state.borrow);

//   const [readBook, setReadBook] = useState(null);
//   const [borrowBookId, setBorrowBookId] = useState("");
//   const [searchedKeyword, setSearchedKeyword] = useState("");

//   useEffect(() => {
//     console.log("🔄 Fetching books...");
//     dispatch(fetchAllBooks());
//     if (isAuthenticated && user?.role !== "Admin") {
//       dispatch(fetchUsersBorrowedBooks());
//     }
//   }, [dispatch, isAuthenticated, user?.role]);

//   useEffect(() => {
//     if (message) {
//       toast.success(message);
//       dispatch(resetBookSlice());
//     } else if (borrowSliceMessage) {
//       toast.success(borrowSliceMessage);
//       dispatch(resetBorrowSlice());
//     }

//     if (error) {
//       toast.error(error);
//       dispatch(resetBookSlice());
//     } else if (borrowSliceError) {
//       toast.error(borrowSliceError);
//       dispatch(resetBorrowSlice());
//     }
//   }, [message, error, borrowSliceMessage, borrowSliceError, dispatch]);

//   const openReadPopup = (id) => {
//     setReadBook(books.find((b) => b._id === id));
//     dispatch(toggleReadBookPopup());
//   };

//   const openRecordBookPopup = (id) => {
//     setBorrowBookId(id);
//     dispatch(toggleRecordBookPopup());
//   };

//   const handleSearch = (e) => setSearchedKeyword(e.target.value.toLowerCase());
//   const searchedBooks = books.filter((book) =>
//     book.title.toLowerCase().includes(searchedKeyword)
//   );

//   return (
//     <>
//       <main className="relative flex-1 p-6 pt-28">
//         <Header />
//         <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
//           <div className="flex w-full md:w-auto md:items-center md:space-x-4">
//             <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
//               {user?.role === "Admin" ? "Book Management" : "Books"}
//             </h2>
//             {isAuthenticated && user?.role === "Admin" && (
//               <button
//                 onClick={() => dispatch(toggleAddBookPopup())}
//                 className="relative pl-14 w-full sm:w-52 flex gap-4 justify-center items-center py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-gray-800"
//               >
//                 <span className="bg-white flex justify-center items-center rounded-full text-black w-[25px] h-[25px] text-[27px] absolute left-5"></span>
//                 Add Book
//               </button>
//             )}
//             <input
//               type="text"
//               placeholder="Search books..."
//               className="w-full sm:w-52 border p-2 border-gray-300 rounded-md mt-2 md:mt-0"
//               value={searchedKeyword}
//               onChange={handleSearch}
//             />
//           </div>
//         </header>

//         {loading ? (
//           <p className="text-lg text-gray-600 mt-10">Loading...</p>
//         ) : books?.length > 0 ? (
//           <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
//             <table className="min-w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-300">
//                   <th className="px-4 py-2 text-left">#</th>
//                   <th className="px-4 py-2 text-left">Title</th>
//                   <th className="px-4 py-2 text-left">Author</th>
//                   {user?.role === "Admin" && <th className="px-4 py-2">Qty</th>}
//                   <th className="px-4 py-2 text-left">Price</th>
//                   <th className="px-4 py-2 text-left">Availability</th>
//                   <th className="px-4 py-2 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {searchedBooks.map((book, idx) => (
//                   <tr key={book._id} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
//                     <td className="px-4 py-2">{idx + 1}</td>
//                     <td className="px-4 py-2">{book.title}</td>
//                     <td className="px-4 py-2">{book.author}</td>
//                     {user?.role === "Admin" && (
//                       <td className="px-4 py-2">{book.quantity}</td>
//                     )}
//                     <td className="px-4 py-2">₹{book.price}</td>
//                     <td className="px-4 py-2">{book.availability ? 'Available' : 'Unavailable'}</td>
//                     <td className="px-4 py-2 flex justify-center space-x-2">
//                       <BookA onClick={() => openReadPopup(book._id)} className="cursor-pointer hover:text-blue-500" />
//                       {user?.role === "Admin" && (
//                         <NotebookPen onClick={() => openRecordBookPopup(book._id)} className="cursor-pointer hover:text-green-600" />
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <h3 className="text-3xl mt-5 font-medium">No books found in library.</h3>
//         )}
//       </main>

//       {addBookPopup && <AddBookPopup />}
//       {readBookPopup && <ReadBookPopup book={readBook} />}
//       {recordBookPopup && <RecordBookPopup bookId={borrowBookId} />}
//     </>
//   );
// };

// export default BookManagement;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBooks,
  deleteBook,
} from "../../store/slice/bookSlice";
import { toggleAddBookPopup } from "../../store/slice/popupSlice";
import AddBookPopup from "../../components/popup/BookPopup/AddBookPopup";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import bookIcon from "../assets/bookIcon"; // ✅ Ensure this image exists

const BookManagement = () => {
  const dispatch = useDispatch();

  // ✅ Get all books and popup status from Redux
  const { books } = useSelector((state) => state.book) || { books: [] };
  const { isAddBookPopupOpen } = useSelector((state) => state.popup) || {};

  // ✅ Fetch all books when component mounts
  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  // ✅ Handle delete with toast
  const handleDelete = (bookId) => {
    if (!bookId) return;
    dispatch(deleteBook(bookId)).then(() => {
      toast.success("Book deleted successfully");
    });
  };

  return (
    <div className="w-full px-4 py-6 md:px-10">
      {/* Header with title, search, and Add button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Book Management</h2>

        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search books..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring focus:ring-blue-200"
          />
          <button
            onClick={() => dispatch(toggleAddBookPopup())}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            + Add Book
          </button>
        </div>
      </div>

      {/* Grid of books */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books && books.length > 0 ? (
          books.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between h-full"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={bookIcon}
                  alt="Book Icon"
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                  <p className="text-sm text-gray-500">{book.author}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => window.open(book.fileUrl, "_blank")}
                  className="flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-green-600 transition"
                >
                  <IoEyeOutline size={18} />
                  View
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-red-600 transition"
                >
                  <FiTrash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg">
            No books found.
          </div>
        )}
      </div>

      {/* Add Book Popup */}
      {isAddBookPopupOpen && <AddBookPopup />}
    </div>
  );
};

export default BookManagement;
