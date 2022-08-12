import React from "react";
import { useSelector } from "react-redux";
import { actualHours, minDate } from "../../utils/Data";

const Modal = ({ horario, handleTime, fullName, email, phone }) => {
  const date = useSelector((state) => state.date.date);
  const time = useSelector((state) => state.date.hora);
  const reserved = useSelector((state) => state.turnsReserved.turns);
  const admin = useSelector((state) => state.admin.isAdmin);
  return (
    <>
      {/* Button trigger modal */}
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
        onClick={handleTime}
        type="button"
        className={
          time === horario.title
            ? "btn btn-secondary mt-2"
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
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        {horario.title}
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {time}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <h3>Nombre: {fullName} </h3>
              <h4>Email/User: {email}</h4>
              <h4>Tel: {phone}</h4>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Eliminar turno
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
