import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosConfig'; // ✅ Centralized config

const borrowSlice = createSlice({
  name: 'borrow',
  initialState: {
    userBorrowedBooks: [],
    allBorrowedBooks: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    fetchUsersBorrowedBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchUsersBorrowedBooksSuccess: (state, action) => {
      state.userBorrowedBooks = action.payload;
      state.loading = false;
    },
    fetchUsersBorrowedBooksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    recordBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    recordBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    recordBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    fetchAllBorrowedBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchAllBorrowedBooksSuccess: (state, action) => {
      state.allBorrowedBooks = action.payload;
      state.loading = false;
    },
    fetchAllBorrowedBooksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    returnBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    returnBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    returnBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetBorrowSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

// ✅ Actions
export const {
  fetchUsersBorrowedBooksRequest,
  fetchUsersBorrowedBooksSuccess,
  fetchUsersBorrowedBooksFailed,
  fetchAllBorrowedBooksRequest,
  fetchAllBorrowedBooksSuccess,
  fetchAllBorrowedBooksFailed,
  recordBookRequest,
  recordBookSuccess,
  recordBookFailed,
  returnBookRequest,
  returnBookSuccess,
  returnBookFailed,
  resetBorrowSlice: resetBorrowSliceAction,
} = borrowSlice.actions;

// ✅ Thunks
export const fetchUsersBorrowedBooks = () => async (dispatch) => {
  dispatch(fetchUsersBorrowedBooksRequest());
  try {
    const res = await axiosInstance.get("/borrow/my-borrowed-books");
    dispatch(fetchUsersBorrowedBooksSuccess(res.data.borrowedBooks));
  } catch (err) {
    dispatch(fetchUsersBorrowedBooksFailed(err?.response?.data?.message || "Failed to fetch"));
  }
};

export const fetchAllBorrowedBooks = () => async (dispatch) => {
  dispatch(fetchAllBorrowedBooksRequest());
  try {
    const res = await axiosInstance.get("/borrow/borrowed-books-users");
    dispatch(fetchAllBorrowedBooksSuccess(res.data.borrowedBooks));
  } catch (err) {
    dispatch(fetchAllBorrowedBooksFailed(err?.response?.data?.message || "Failed to fetch all borrows"));
  }
};

export const recordBorrowBook = (id, email) => async (dispatch) => {
  dispatch(recordBookRequest());
  try {
    const res = await axiosInstance.post(`/borrow/record-borrow-book/${id}`, { email });
    dispatch(recordBookSuccess(res.data.message));
  } catch (err) {
    dispatch(recordBookFailed(err?.response?.data?.message || "Failed to borrow"));
  }
};

export const returnBook = (email, id) => async (dispatch) => {
  dispatch(returnBookRequest());
  try {
    const res = await axiosInstance.post(`/borrow/return-borrow-book/${id}`, { email });
    dispatch(returnBookSuccess(res.data.message));
  } catch (err) {
    dispatch(returnBookFailed(err?.response?.data?.message || "Return failed"));
  }
};

export const resetBorrowSlice = () => (dispatch) => {
  dispatch(resetBorrowSliceAction());
};

export default borrowSlice.reducer;
