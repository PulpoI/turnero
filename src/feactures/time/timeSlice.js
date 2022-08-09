import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hora: "",
};

export const timeSlice = createSlice({
  name: "time",
  initialState: initialState,
  reducers: {
    setTime: (state, action) => {
      state.hora = action.payload.hora;
    },
  },
});

export const { setTime } = timeSlice.actions;

export default timeSlice.reducer;
