import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosConfig"; // ✅ Correct instance
import { toggleAddNewAdminPopup } from "./popupSlice";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
  },
  reducers: {
    fetchAllUsersRequest(state) {
      state.loading = true;
    },
    fetchAllUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    fetchAllUsersFailed(state) {
      state.loading = false;
    },
    addNewAdminRequest(state) {
      state.loading = true;
    },
    addNewAdminSuccess(state) {
      state.loading = false;
    },
    addNewAdminFailed(state) {
      state.loading = false;
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

// ✅ Thunks

export const fetchAllUsers = () => async (dispatch) => {
  dispatch(fetchAllUsersRequest());
  try {
    const res = await axiosInstance.get("/user/all");
    dispatch(fetchAllUsersSuccess(res.data.users));
  } catch (err) {
    console.error("⚠️ fetchAllUsers error:", err.response?.data || err.message);
    dispatch(fetchAllUsersFailed());
    toast.error(err?.response?.data?.message || "Failed to fetch users");
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
    dispatch(addNewAdminFailed());
    toast.error(err?.response?.data?.message || "Failed to add admin");
  }
};

export default userSlice.reducer;
