import React from "react";
import { ButtonTime } from "../ButtonTime/ButtonTime";

const ButtonTimeContainer = ({ turnChoose, handleTime, turnName }) => {
  return (
    <div className="col-6 border border-1 rounded">
      <p className="mb-1 text-center">{turnName}</p>
      <div className="d-flex flex-wrap d-flex justify-content-evenly">
        {turnChoose.map((horario) => {
          return (
            <div key={horario.id}>
              <ButtonTime horario={horario} handleTime={handleTime} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ButtonTimeContainer;
