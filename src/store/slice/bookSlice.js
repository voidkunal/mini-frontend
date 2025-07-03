// ✅ Fixed bookSlice.js to include proper fetchAllBooks export
import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig';

const bookSlice = createSlice({
  name: 'book',
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

// ✅ Thunk: Fetch All Books
export const fetchAllBooks = () => async (dispatch) => {
  dispatch(fetchBooksRequest());
  try {
    const res = await axiosInstance.get("/book/all");
    dispatch(fetchBooksSuccess(res.data.books));
  } catch (err) {
    dispatch(fetchBooksFailed(err?.response?.data?.message || "Failed to fetch books"));
  }
};

// ✅ Thunk: Add Book
export const addBook = (data) => async (dispatch) => {
  dispatch(addBookRequest());
  try {
    const res = await axiosInstance.post("/book/admin/add", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(addBookSuccess(res.data));
  } catch (err) {
    dispatch(addBookFailed(err?.response?.data?.message || "Failed to add book"));
  }
};

// ✅ Thunk: Delete Book
export const deleteBook = (id) => async (dispatch) => {
  dispatch(fetchBooksRequest());
  try {
    await axiosInstance.delete(`/book/delete/${id}`);
    dispatch(fetchAllBooks());
  } catch (err) {
    dispatch(fetchBooksFailed(err?.response?.data?.message || "Failed to delete book"));
  }
};

export default bookSlice.reducer;
