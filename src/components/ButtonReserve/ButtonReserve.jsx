import React from "react";
import { FechaElegida } from "../../hooks/FechaElegida";
import { actualHours, minDate } from "../../utils/Data";

const ButtonReserve = ({ handleSubmit, reserved, date, time }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center mb-3 mt-3"
    >
      <button
        disabled={
          reserved.find((turno) => {
            return turno.fecha === date.toISOString() && turno.hora === time;
          }) ||
          time === "" ||
          (actualHours > time &&
            date.toLocaleDateString("en-GB") ===
              new Date(minDate).toLocaleDateString("en-GB")) & true ||
          (FechaElegida(new Date(date)).split(",")[0] === "Domingo" ||
            FechaElegida(new Date(date)).split(",")[0] === "Sábado") & true
            ? true
            : false
        }
        className="btn btn-dark btn-lg btn-block"
      >
        !Reservar turno!
      </button>
      {actualHours > time &&
      time !== "" &&
      (date.toLocaleDateString("en-GB") ===
        new Date(minDate).toLocaleDateString("en-GB")) &
        true ? (
        <p className="text-danger text-center">
          No puedes reservar un turno en el pasado, elige otro horario.
        </p>
      ) : null}
    </form>
  );
};

export default ButtonReserve;
