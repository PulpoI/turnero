import { createSlice } from "@reduxjs/toolkit/";

const initialState = {
  isAdmin: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.isAdmin = action.payload.isAdmin;
    },
    unsetAdmin: (state) => {
      state.isAdmin = false;
    },
  },
});

export const { setAdmin, unsetAdmin } = adminSlice.actions;

export default adminSlice.reducer;
