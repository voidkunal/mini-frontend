// import { createSlice } from "@reduxjs/toolkit";

// const popupSlice = createSlice({
//   name: "popup",
//   initialState: {
//     settingPopup: false,
//     addBookPopup: false,
//     readBookPopup: false,
//     recordBookPopup: false,
//     returnBookPopup: false,
//     addNewAdminPopup: false,
//   },
//   reducers: {
//     toggleSettingPopup(state) {
//       state.settingPopup = !state.settingPopup;
//     },
//     toggleAddBookPopup(state) {
//       state.addBookPopup = !state.addBookPopup;
//     },
//     toggleReadBookPopup(state) {
//       state.readBookPopup = !state.readBookPopup;
//     },
//     toggleRecordBookPopup(state) {
//       state.recordBookPopup = !state.recordBookPopup;
//     },
//     toggleAddNewAdminPopup(state) {
//       state.addNewAdminPopup = !state.addNewAdminPopup;
//     },
//     toggleReturnBookPopup(state) {
//       state.returnBookPopup = !state.returnBookPopup;
//     },
//     closeAllPopup(state) {
//       state.addBookPopup = false;
//       state.readBookPopup = false;
//       state.recordBookPopup = false;
//       state.returnBookPopup = false;
//       state.settingPopup = false;
//       state.addNewAdminPopup = false;
//     },
//     closePopup(state, action) {
//       const popupName = action.payload;
//       if (state.hasOwnProperty(popupName)) {
//         state[popupName] = false;
//       }
//     }
//   },
// });

// export const {
//   toggleSettingPopup,
//   toggleAddBookPopup,
//   toggleReadBookPopup,
//   toggleRecordBookPopup,
//   toggleAddNewAdminPopup,
//   toggleReturnBookPopup,
//   closeAllPopup,
//   closePopup,              // ✅ Now exported properly
// } = popupSlice.actions;

// export default popupSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    settingPopup: false,
    addBookPopup: false,
    readBookPopup: false,
    recordBookPopup: false,
    returnBookPopup: false,
    addNewAdminPopup: false,
  },
  reducers: {
    toggleSettingPopup(state) {
      state.settingPopup = !state.settingPopup;
    },
    toggleAddBookPopup(state) {
      state.addBookPopup = !state.addBookPopup;
    },
    toggleReadBookPopup(state) {
      state.readBookPopup = !state.readBookPopup;
    },
    toggleRecordBookPopup(state) {
      state.recordBookPopup = !state.recordBookPopup;
    },
    toggleAddNewAdminPopup(state) {
      state.addNewAdminPopup = !state.addNewAdminPopup;
    },
    toggleReturnBookPopup(state) {
      state.returnBookPopup = !state.returnBookPopup;
    },
    closeAllPopup(state) {
      state.addBookPopup = false;
      state.readBookPopup = false;
      state.recordBookPopup = false;
      state.returnBookPopup = false;
      state.settingPopup = false;
      state.addNewAdminPopup = false;
    },
    closePopup(state, action) {
      const popupName = action.payload;
      if (state.hasOwnProperty(popupName)) {
        state[popupName] = false;
      }
    }
  },
});

export const {
  toggleSettingPopup,
  toggleAddBookPopup,
  toggleReadBookPopup,
  toggleRecordBookPopup,
  toggleAddNewAdminPopup,
  toggleReturnBookPopup,
  closeAllPopup,
  closePopup,
} = popupSlice.actions;

export default popupSlice.reducer;
