import { createSlice } from "@reduxjs/toolkit";

const minDate = new Date().setHours(0, 0, 0, 0);

const initialState = {
  date: new Date(minDate),
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
