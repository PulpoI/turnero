import React from "react";
import { useSelector } from "react-redux";

export const ButtonTime = ({ horario, handleTime }) => {
  const date = useSelector((state) => state.date.date);
  const time = useSelector((state) => state.date.hora);
  const reserved = useSelector((state) => state.turnsReserved.turns);
  return (
    <button
      disabled={
        reserved.find((turno) => {
          return (
            turno.fecha === date.toISOString() && turno.hora === horario.title
          );
        })
          ? true
          : false
      }
      className={
        time === horario.title
          ? "btn btn-primary mt-2"
          : "btn btn-outline-primary mt-2" &&
            reserved.find((turno) => {
              return (
                turno.fecha === date.toISOString() &&
                turno.hora === horario.title
              );
            })
          ? "btn btn-danger  mt-2"
          : "btn btn-outline-primary  mt-2"
      }
      value={horario.title}
      onClick={handleTime}
    >
      {" "}
      {horario.title}
    </button>
  );
};
