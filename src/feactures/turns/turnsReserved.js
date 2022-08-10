import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  turns: [],
};

export const turnsReserved = createSlice({
  name: "turnsReserved",
  initialState: initialState,
  reducers: {
    setReserved: (state, action) => {
      // state.fecha = action.payload.fecha;
      // state.hora = action.payload.hora;
      state.turns = action.payload.turns;
    },
  },
});

export const { setReserved } = turnsReserved.actions;

export default turnsReserved.reducer;
