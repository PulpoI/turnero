import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  passed: [],
};

export const turnsPassed = createSlice({
  name: "turnsPassed",
  initialState: initialState,
  reducers: {
    setPassed: (state, action) => {
      // state.fecha = action.payload.fecha;
      // state.hora = action.payload.hora;
      state.passed = action.payload.passed;
    },
  },
});

export const { setPassed } = turnsPassed.actions;

export default turnsPassed.reducer;
