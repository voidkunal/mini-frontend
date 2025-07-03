import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";

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
    },
    fetchBooksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addBookRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addBookSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload?.message || "Book added";
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

// Thunks
export const fetchAllBooks = () => async (dispatch) => {
  dispatch(fetchBooksRequest());
  try {
    const res = await axiosInstance.get("/book/all");
    dispatch(fetchBooksSuccess(res.data.books));
  } catch (error) {
    const errMsg = error?.response?.data?.message || "Failed to fetch books";
    dispatch(fetchBooksFailed(errMsg));
  }
};

export const addBook = (formData) => async (dispatch) => {
  dispatch(addBookRequest());
  try {
    const res = await axiosInstance.post("/book/admin/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(addBookSuccess(res.data));
    dispatch(fetchAllBooks());
  } catch (error) {
    const errMsg = error?.response?.data?.message || "Failed to add book";
    dispatch(addBookFailed(errMsg));
  }
};

export const deleteBook = (bookId) => async (dispatch) => {
  dispatch(fetchBooksRequest());
  try {
    await axiosInstance.delete(`/book/delete/${bookId}`);
    dispatch(fetchAllBooks());
  } catch (error) {
    const errMsg = error?.response?.data?.message || "Failed to delete book";
    dispatch(fetchBooksFailed(errMsg));
  }
};

export default bookSlice.reducer;
