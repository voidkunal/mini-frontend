// src/store/slice/popupSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPopupOpen: false,
  popupContent: null,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopup: (state, action) => {
      state.isPopupOpen = true;
      state.popupContent = action.payload;
    },
    closePopup: (state) => {
      state.isPopupOpen = false;
      state.popupContent = null;
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;

export default popupSlice.reducer;
