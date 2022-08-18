import React from "react";
import { useSelector } from "react-redux";
import { actualHours, minDate } from "../../utils/Data";

export const ButtonTime = ({ horario, handleTime }) => {
  const date = useSelector((state) => state.date.date);
  const time = useSelector((state) => state.date.hora);
  const reserved = useSelector((state) => state.turnsReserved.turns);
  const admin = useSelector((state) => state.admin.isAdmin);

  return (
    <button
      disabled={
        !admin &&
        reserved.find((turno) => {
          return (
            turno.fecha === date.toISOString() && turno.hora === horario.title
          );
        })
          ? true
          : false ||
            (actualHours > horario.title && true) &
              (date.toISOString() === new Date(minDate).toISOString())
          ? true
          : false
      }
      className={
        time === horario.title
          ? "btn btn-dark mt-2 px-5 py-3"
          : "btn btn-outline-dark mt-2 px-5 py-3" &&
            reserved.find((turno) => {
              return (
                turno.fecha === date.toISOString() &&
                turno.hora === horario.title
              );
            })
          ? "btn btn-danger mt-2 px-5 py-3"
          : "btn btn-outline-dark  mt-2 px-5 py-3"
      }
      value={horario.title}
      onClick={handleTime}
    >
      {" "}
      {horario.title}
    </button>
  );
};
