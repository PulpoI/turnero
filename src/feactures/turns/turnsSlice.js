import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  phone: "",
  fecha: "",
  hora: "",
  disponible: true,
  fullName: "",
  id: "",
};

export const turnsSlice = createSlice({
  name: "turns",
  initialState: initialState,
  reducers: {
    setTurn: (state, action) => {
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.fecha = action.payload.fecha;
      state.hora = action.payload.hora;
      state.disponible = action.payload.disponible;
      state.fullName = action.payload.fullName;
      state.id = action.payload.id;
    },
    unsetTurn: (state) => {
      state.email = "";
      state.phone = "";
      state.fecha = "";
      state.hora = "";
      state.disponible = true;
      state.fullName = "";
      state.id = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTurn, unsetTurn } = turnsSlice.actions;

export default turnsSlice.reducer;
