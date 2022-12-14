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

// set time for today
export const minDate = new Date().setHours(0, 0, 0, 0);

// set time for today
let hours = new Date().getHours();
let minutes = new Date().getMinutes();
if (hours < 10) {
  hours = "0" + hours;
}
if (minutes < 10) {
  minutes = "0" + minutes;
}
export let actualHours = `${hours}:${minutes}`;

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

export const admin = "admin";
