import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: new Date(),
  hora: "",
};

export const dateSlice = createSlice({
  name: "date",
  initialState: initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload.date;
    },
    setTime: (state, action) => {
      state.hora = action.payload.hora;
    },
  },
});

export const { setDate, setTime } = dateSlice.actions;

export default dateSlice.reducer;
