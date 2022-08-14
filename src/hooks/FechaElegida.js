import { dias_semana, meses } from "../utils/Data";

export function FechaElegida(date) {
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
