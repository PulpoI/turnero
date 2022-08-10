//date months
export const meses = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
//date days
export const dias_semana = [
  "Domingo",
  "Lunes",
  "martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export function useFechaElegida(date) {
  return (
    dias_semana[date.getDay()] +
    ", " +
    date.getDate() +
    " de " +
    meses[date.getMonth()] +
    " de " +
    date.getUTCFullYear()
  );
}

export const turnos = [
  {
    id: 1,
    title: "08:00",
    turno: "mañana",
    disponible: true,
  },
  {
    id: 2,
    title: "08:30",
    turno: "mañana",
    disponible: true,
  },
  {
    id: 3,
    title: "09:00",
    turno: "mañana",
    disponible: true,
  },
  {
    id: 4,
    title: "09:30",
    turno: "mañana",
    disponible: true,
  },
  {
    id: 5,
    title: "10:30",
    turno: "mañana",
    disponible: true,
  },
  {
    id: 6,
    title: "10:30",
    turno: "mañana",
    disponible: true,
  },
  {
    id: 7,
    title: "11:00",
    turno: "mañana",
    disponible: true,
  },
  {
    id: 8,
    title: "11:30",
    turno: "mañana",
    disponible: true,
  },
  {
    id: 9,
    title: "14:00",
    turno: "tarde",

    disponible: true,
  },
  {
    id: 10,
    title: "14:30",
    turno: "tarde",

    disponible: true,
  },
  {
    id: 11,
    title: "15:00",
    turno: "tarde",

    disponible: true,
  },
  {
    id: 12,
    title: "15:30",
    turno: "tarde",

    disponible: true,
  },
  {
    id: 13,
    title: "16:00",
    turno: "tarde",

    disponible: true,
  },
  {
    id: 14,
    title: "16:30",
    turno: "tarde",

    disponible: true,
  },
  {
    id: 15,
    title: "17:00",
    turno: "tarde",

    disponible: true,
  },
  {
    id: 16,
    title: "17:30",
    turno: "tarde",

    disponible: true,
  },
];

export const turnoMañana = [
  {
    id: 1,
    title: "08:00",
  },
  {
    id: 2,
    title: "08:30",
  },
  {
    id: 3,
    title: "09:00",
  },
  {
    id: 4,
    title: "09:30",
  },
  {
    id: 5,
    title: "10:00",
  },
  {
    id: 6,
    title: "10:30",
  },
  {
    id: 7,
    title: "11:00",
  },
  {
    id: 8,
    title: "11:30",
  },
];
export const turnoTarde = [
  {
    id: 9,
    title: "14:00",
  },
  {
    id: 10,
    title: "14:30",
  },
  {
    id: 11,
    title: "15:00",
  },
  {
    id: 12,
    title: "15:30",
  },
  {
    id: 13,
    title: "16:00",
  },
  {
    id: 14,
    title: "16:30",
  },
  {
    id: 15,
    title: "17:00",
  },
  {
    id: 16,
    title: "17:30",
  },
];

const initialState = {
  turnos: [
    {
      id: 1,
      cliente: "",
      fecha: "",
      hora: "08:00",
      turno: "mañana",
      disponible: true,
    },
    {
      id: 2,
      cliente: "",
      fecha: new Date(),
      hora: "08:30",
      turno: "mañana",
      disponible: true,
    },
    {
      id: 3,
      cliente: "",
      fecha: new Date(),
      hora: "09:00",
      turno: "mañana",
      disponible: true,
    },
    {
      id: 4,
      cliente: "",
      fecha: new Date(),
      hora: "09:30",
      turno: "mañana",
      disponible: true,
    },
    {
      id: 5,
      cliente: "",
      fecha: new Date(),
      hora: "10:30",
      turno: "mañana",
      disponible: true,
    },
    {
      id: 6,
      cliente: "",
      fecha: new Date(),
      hora: "10:30",
      turno: "mañana",
      disponible: true,
    },
    {
      id: 7,
      cliente: "",
      fecha: new Date(),
      hora: "11:00",
      turno: "mañana",
      disponible: true,
    },
    {
      id: 8,
      cliente: "",
      fecha: new Date(),
      hora: "11:30",
      turno: "mañana",
      disponible: true,
    },
    {
      id: 9,
      cliente: "",
      fecha: new Date(),
      hora: "14:00",
      turno: "tarde",

      disponible: true,
    },
    {
      id: 10,
      cliente: "",
      fecha: new Date(),
      hora: "14:30",
      turno: "tarde",

      disponible: true,
    },
    {
      id: 11,
      cliente: "",
      fecha: new Date(),
      hora: "15:00",
      turno: "tarde",

      disponible: true,
    },
    {
      id: 12,
      cliente: "",
      fecha: new Date(),
      hora: "15:30",
      turno: "tarde",

      disponible: true,
    },
    {
      id: 13,
      cliente: "",
      fecha: new Date(),
      hora: "16:00",
      turno: "tarde",

      disponible: true,
    },
    {
      id: 14,
      cliente: "",
      fecha: new Date(),
      hora: "16:30",
      turno: "tarde",

      disponible: true,
    },
    {
      id: 15,
      cliente: "",
      fecha: new Date(),
      hora: "17:00",
      turno: "tarde",

      disponible: true,
    },
    {
      id: 16,
      cliente: "",
      fecha: new Date(),
      hora: "17:30",
      turno: "tarde",

      disponible: true,
    },
  ],
};
