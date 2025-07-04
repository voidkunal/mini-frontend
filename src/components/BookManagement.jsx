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
import RecordBookPopup from "../popups/RecordBookPopup";

const BookManagement = () => {
  const dispatch = useDispatch();
  const { loading, error, message, books } = useSelector((state) => state.book);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { addBookPopup, readBookPopup, recordBookPopup } = useSelector((state) => state.popup);
  const {
    message: borrowSliceMessage,
    error: borrowSliceError,
  } = useSelector((state) => state.borrow);

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
    } else if (borrowSliceMessage) {
      toast.success(borrowSliceMessage);
      dispatch(resetBorrowSlice());
    }

    if (error) {
      toast.error(error);
      dispatch(resetBookSlice());
    } else if (borrowSliceError) {
      toast.error(borrowSliceError);
      dispatch(resetBorrowSlice());
    }
  }, [message, error, borrowSliceMessage, borrowSliceError, dispatch]);

  const openReadPopup = (id) => {
    setReadBook(books.find((b) => b._id === id));
    dispatch(toggleReadBookPopup());
  };

  const openRecordBookPopup = (id) => {
    setBorrowBookId(id);
    dispatch(toggleRecordBookPopup());
  };

  const handleSearch = (e) => setSearchedKeyword(e.target.value.toLowerCase());
  const searchedBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchedKeyword)
  );

  return (
    <>
      <Header />
      <main className="pt-24 px-4 pb-8 md:pl-64 bg-gray-50 min-h-screen">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {user?.role === "Admin" ? "Book Management" : "Books"}
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            {isAuthenticated && user?.role === "Admin" && (
              <button
                onClick={() => dispatch(toggleAddBookPopup())}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition w-full sm:w-auto"
              >
                <span className="bg-white text-black w-[25px] h-[25px] text-lg flex items-center justify-center rounded-full">+</span>
                Add Book
              </button>
            )}
            <input
              type="text"
              placeholder="Search books..."
              className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-60"
              value={searchedKeyword}
              onChange={handleSearch}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-lg text-gray-600 mt-10">Loading...</p>
        ) : books?.length > 0 ? (
          <div className="overflow-x-auto rounded-md shadow bg-white">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-200 text-sm md:text-base">
                <tr>
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Author</th>
                  {user?.role === "Admin" && (
                    <th className="px-4 py-2 text-left">Qty</th>
                  )}
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Availability</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchedBooks.map((book, idx) => (
                  <tr key={book._id} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="px-4 py-2 whitespace-nowrap">{idx + 1}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{book.title}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{book.author}</td>
                    {user?.role === "Admin" && (
                      <td className="px-4 py-2 whitespace-nowrap">{book.quantity}</td>
                    )}
                    <td className="px-4 py-2 whitespace-nowrap">₹{book.price}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {book.availability ? "Available" : "Unavailable"}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex justify-center gap-3">
                        <BookA
                          onClick={() => openReadPopup(book._id)}
                          className="cursor-pointer hover:text-blue-500 transition"
                        />
                        {user?.role === "Admin" && (
                          <NotebookPen
                            onClick={() => openRecordBookPopup(book._id)}
                            className="cursor-pointer hover:text-green-600 transition"
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="text-2xl font-medium text-center mt-8">
            No books found in library.
          </h3>
        )}
      </main>

      {/* Popups */}
      {addBookPopup && <AddBookPopup />}
      {readBookPopup && <ReadBookPopup book={readBook} />}
      {recordBookPopup && <RecordBookPopup bookId={borrowBookId} />}
    </>
  );
};

export default BookManagement;