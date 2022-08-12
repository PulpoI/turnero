import { createSlice } from "@reduxjs/toolkit/";

const initialState = {
  email: "",
  phone: "",
  fullName: "",
  token: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.fullName = action.payload.fullName;
      state.token = action.payload.token;
    },
    unsetUser: (state) => {
      state.email = "";
      state.phone = "";
      state.fullName = "";
      state.token = "";
    },
  },
});

export const { setUser, unsetUser } = usersSlice.actions;

export default usersSlice.reducer;
