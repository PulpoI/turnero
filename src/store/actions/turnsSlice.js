import { createSlice } from "@reduxjs/toolkit/";
const initialState = [
  {
    id: 1,
    cliente: "",
    telefono: "",
    fecha: "",
    hora: "08:00",
    turno: "mañana",
    disponible: true,
  },
  {
    id: 2,
    cliente: "",
    telefono: "",
    fecha: new Date(),
    hora: "08:30",
    turno: "mañana",
    disponible: true,
  },
  {
    id: 3,
    cliente: "",
    telefono: "",
    fecha: new Date(),
    hora: "09:00",
    turno: "mañana",
    disponible: true,
  },
  {
    id: 4,
    cliente: "",
    telefono: "",
    fecha: new Date(),
    hora: "09:30",
    turno: "mañana",
    disponible: true,
  },
  {
    id: 5,
    cliente: "",
    telefono: "",
    fecha: new Date(),
    hora: "10:30",
    turno: "mañana",
    disponible: true,
  },
  {
    id: 6,
    cliente: "",
    telefono: "",
    fecha: new Date(),
    hora: "10:30",
    turno: "mañana",
    disponible: true,
  },
  {
    id: 7,
    cliente: "",
    telefono: "",
    fecha: new Date(),
    hora: "11:00",
    turno: "mañana",
    disponible: true,
  },
  {
    id: 8,
    cliente: "",
    telefono: "",
    fecha: new Date(),
    hora: "11:30",
    turno: "mañana",
    disponible: true,
  },
  {
    id: 9,
    cliente: "",
    telefono: "",
    fecha: new Date(),
    hora: "14:00",
    turno: "tarde",

    disponible: true,
  },
  {
    id: 10,
    cliente: "",
    telefono: "",
    fecha: new Date(),
    hora: "14:30",
    turno: "tarde",

    disponible: true,
  },
  {
    id: 11,
    cliente: "",
    telefono: "",
    fecha: new Date(),
    hora: "15:00",
    turno: "tarde",

    disponible: true,
  },
  {
    id: 12,
    cliente: "",
    telefono: "",
    fecha: new Date(),
    hora: "15:30",
    turno: "tarde",

    disponible: true,
  },
  {
    id: 13,
    cliente: "",
    telefono: "",
    fecha: new Date(),
    hora: "16:00",
    turno: "tarde",

    disponible: true,
  },
  {
    id: 14,
    cliente: "",
    telefono: "",
    fecha: new Date(),
    hora: "16:30",
    turno: "tarde",

    disponible: true,
  },
  {
    id: 15,
    cliente: "",
    telefono: "",
    fecha: new Date(),
    hora: "17:00",
    turno: "tarde",

    disponible: true,
  },
  {
    id: 16,
    cliente: "",
    telefono: "",
    fecha: new Date(),
    hora: "17:30",
    turno: "tarde",

    disponible: true,
  },
];

export const turnSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    addTurn: (state, action) => {
      state.push(action.payload);
    },
    editTurn: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { addTurn, editTurn } = turnSlice.actions;
export default turnSlice.reducer;
