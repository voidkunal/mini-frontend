import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settingPopup: false,
  addBookPopup: false,
  readBookPopup: false,
  recordBookPopup: false,
  returnBookPopup: false,
  addNewAdminPopup: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    toggleSettingPopup: (state) => {
      state.settingPopup = !state.settingPopup;
    },
    toggleAddBookPopup: (state) => {
      state.addBookPopup = !state.addBookPopup;
    },
    toggleReadBookPopup: (state) => {
      state.readBookPopup = !state.readBookPopup;
    },
    toggleRecordBookPopup: (state) => {
      state.recordBookPopup = !state.recordBookPopup;
    },
    toggleReturnBookPopup: (state) => {
      state.returnBookPopup = !state.returnBookPopup;
    },
    toggleAddNewAdminPopup: (state) => {
      state.addNewAdminPopup = !state.addNewAdminPopup;
    },
    closeAllPopup: (state) => {
      Object.keys(state).forEach((key) => {
        state[key] = false;
      });
    },
    closePopup: (state, action) => {
      const popupName = action.payload;
      if (popupName in state) {
        state[popupName] = false;
      }
    },
  },
});

export const {
  toggleSettingPopup,
  toggleAddBookPopup,
  toggleReadBookPopup,
  toggleRecordBookPopup,
  toggleReturnBookPopup,
  toggleAddNewAdminPopup,
  closeAllPopup,
  closePopup,
} = popupSlice.actions;

export default popupSlice.reducer;
