import React from "react";
import Modal from "../Modal/Modal";

export const ModalContainer = ({
  turnChoose,
  handleTime,
  turn,
  cancelTurn,
  handleSubmit,
  turnName,
}) => {
  return (
    <div className="col-6 border border-1 rounded">
      <p className="mb-1 text-center">{turnName}</p>
      <div className="d-flex flex-wrap d-flex justify-content-evenly">
        {turnChoose.map((horario) => {
          return (
            <div key={horario.id}>
              <Modal
                horario={horario}
                handleTime={handleTime}
                fullName={turn.fullName}
                email={turn.email}
                phone={turn.phone}
                cancelTurn={cancelTurn}
                handleSubmit={handleSubmit}
                turnId={turn.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
