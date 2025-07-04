// src/redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosConfig";
import { toggleAddNewAdminPopup } from "./popupSlice";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchAllUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchAllUsersFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch users.";
    },

    addNewAdminRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addNewAdminSuccess: (state) => {
      state.loading = false;
    },
    addNewAdminFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to add admin.";
    },
  },
});

export const {
  fetchAllUsersRequest,
  fetchAllUsersSuccess,
  fetchAllUsersFailed,
  addNewAdminRequest,
  addNewAdminSuccess,
  addNewAdminFailed,
} = userSlice.actions;

export default userSlice.reducer;

// ------------------- Thunks -------------------

export const fetchAllUsers = () => async (dispatch) => {
  dispatch(fetchAllUsersRequest());
  try {
    const res = await axiosInstance.get("/user/all");
    dispatch(fetchAllUsersSuccess(res.data.users));
  } catch (err) {
    const msg = err?.response?.data?.message || err.message || "Failed to fetch users";
    console.error("⚠️ fetchAllUsers error:", msg);
    dispatch(fetchAllUsersFailed(msg));
    toast.error(msg);
  }
};

export const addNewAdmin = (formData) => async (dispatch) => {
  dispatch(addNewAdminRequest());
  try {
    const res = await axiosInstance.post("/user/add/new-Admin", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(addNewAdminSuccess());
    toast.success(res.data.message || "Admin added successfully");
    dispatch(toggleAddNewAdminPopup());
  } catch (err) {
    const msg = err?.response?.data?.message || err.message || "Failed to add admin";
    dispatch(addNewAdminFailed(msg));
    toast.error(msg);
  }
};
