import { useState } from "react";
import { dias_semana, meses } from "../utils/Data";

const useFechaElegida = (date) => {
  const [fechaElegida, setFechaElegida] = useState(new Date());

  setFechaElegida(
    dias_semana[date.getDay()] +
      ", " +
      date.getDate() +
      " de " +
      meses[date.getMonth()] +
      " de " +
      date.getUTCFullYear()
  );
  return { fechaElegida };
};

export default useFechaElegida;
