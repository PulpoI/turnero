import React from "react";
import { Calendar } from "react-calendar";
import { FechaElegida } from "../../hooks/FechaElegida";
import { minDate } from "../../utils/Data";

const CalendarSet = ({ handleDate, date }) => {
  return (
    <div className="container-calendar col-md-4 justify-content-center">
      <p className="mb-1 text-center">Seleccionar fecha:</p>
      <div className="react-calendar">
        <Calendar
          minDate={new Date(minDate)}
          minDetail="month"
          tileDisabled={({ date }) =>
            date.getDay() === 0 || date.getDay() === 6
          }
          onChange={handleDate}
          value={date}
          locale={"es-ES"}
        />
      </div>
      <p className="text-center">{FechaElegida(date)}</p>
    </div>
  );
};

export default CalendarSet;
