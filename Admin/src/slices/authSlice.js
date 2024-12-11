import { createSlice } from "@reduxjs/toolkit";

const initState= {
  accessToken: "",
  user: {},
};

const authReducer = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    saveTokenAndUser: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    deleteTokenAndUser: (state) => {
      state.accessToken = "";
      state.user = {};
    },
    updateInfoUser: (state, action) => {
      if (action.payload.avatar) state.user.avatar = action.payload.avatar;
      state.user.userName = action.payload.userName;
      state.user.address = action.payload.address;
      state.user.phoneNumber = action.payload.phoneNumber;
    },
  },
});

export const { saveTokenAndUser, updateInfoUser, deleteTokenAndUser } =
  authReducer.actions;

export default authReducer.reducer;
