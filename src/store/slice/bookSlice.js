// ✅ Final Fixed bookSlice.js for Vercel Production (Cookies + HTTPS Compatible)
import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig"; // uses VITE_BACKEND_URL withCredentials

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    fetchBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchBooksSuccess: (state, action) => {
      state.books = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchBooksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addBookRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addBookSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload?.message || "Book added successfully";
    },
    addBookFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetBookSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  fetchBooksRequest,
  fetchBooksSuccess,
  fetchBooksFailed,
  addBookRequest,
  addBookSuccess,
  addBookFailed,
  resetBookSlice,
} = bookSlice.actions;

// ✅ Thunks
export const fetchAllBooks = () => async (dispatch) => {
  dispatch(fetchBooksRequest());
  try {
    const { data } = await axiosInstance.get("/book/all");
    dispatch(fetchBooksSuccess(data.books));
  } catch (err) {
    const errorMsg = err?.response?.data?.message || err.message || "Failed to fetch books";
    dispatch(fetchBooksFailed(errorMsg));
  }
};

export const addBook = (bookFormData) => async (dispatch) => {
  dispatch(addBookRequest());
  try {
    const { data } = await axiosInstance.post("/book/admin/add", bookFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(addBookSuccess(data));
  } catch (err) {
    const errorMsg = err?.response?.data?.message || err.message || "Failed to add book";
    dispatch(addBookFailed(errorMsg));
  }
};

export const deleteBook = (bookId) => async (dispatch) => {
  dispatch(fetchBooksRequest());
  try {
    const res = await axiosInstance.delete(`/book/delete/${bookId}`);
    dispatch(fetchAllBooks());
    return { payload: { success: true, message: res.data.message } };
  } catch (err) {
    const errorMsg = err?.response?.data?.message || err.message || "Failed to delete book";
    dispatch(fetchBooksFailed(errorMsg));
    return { payload: { success: false, message: errorMsg } };
  }
};

export default bookSlice.reducer;