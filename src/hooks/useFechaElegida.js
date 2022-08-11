import { dias_semana, meses } from "../utils/Data";

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
