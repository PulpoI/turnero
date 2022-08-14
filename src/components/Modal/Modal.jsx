import Axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTurn } from "../../feactures/turns/turnsSlice";
import { FechaElegida } from "../../hooks/FechaElegida";
import { actualHours, minDate } from "../../utils/Data";
import { setReserved } from "../../feactures/turns/turnsReserved";

const Modal = ({ horario, handleTime, fullName, email, phone }) => {
  const date = useSelector((state) => state.date.date);
  const time = useSelector((state) => state.date.hora);
  const reserved = useSelector((state) => state.turnsReserved.turns);
  const admin = useSelector((state) => state.admin.isAdmin);
  const user = useSelector((state) => state.users);

  const dispatch = useDispatch();

  //setTurn and Reserve turn
  const handleSubmit = (e) => {
    e.preventDefault();
    if (time === "") {
      alert("Seleccione una hora");
    } else {
      if (
        reserved
          .map((turn) => {
            return turn.fecha === date && turn.hora === time;
          })
          .includes(true)
      ) {
        alert("Ya hay un turno reservado para esa fecha y hora");
      } else {
        dispatch(
          setTurn({
            email: user.email,
            phone: user.phone,
            fecha: date,
            hora: time,
            disponible: false,
            fullName: "admin",
          })
        );
        Axios.post("http://localhost:5000/turnos", {
          email: user.email,
          phone: user.phone,
          fecha: date,
          hora: time,
          disponible: false,
          fullName: "admin",
        })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            window.location.reload();
          });
      }
    }
  };

  //function to cancel turn
  const cancelTurn = (id) => {
    console.log(id);
    Axios.delete(`http://localhost:5000/turnos/${id}`)
      .then((response) => {
        const data = response.data;
        dispatch(
          setReserved({
            turns: data,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        window.location.reload();
      });
  };

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
          reserved.find((turno) => {
            return (
              turno.fecha === date.toISOString() && turno.hora === horario.title
            );
          })
            ? "btn btn-danger  mt-2"
            : "btn btn-outline-primary  mt-2" && time === horario.title
            ? "btn btn-primary mt-2"
            : "btn btn-outline-primary mt-2"
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
              {fullName && email && phone ? (
                <>
                  <p>{FechaElegida(date)}</p>
                  <h3>Nombre: {fullName} </h3>
                  <h4>Email/User: {email}</h4>
                  <h4>Tel: {phone}</h4>
                </>
              ) : (
                <>
                  <p>{FechaElegida(date)}</p>
                  <h3>Turno disponible</h3>
                </>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              {fullName && email && phone ? (
                <button
                  type="button"
                  onClick={() =>
                    cancelTurn(
                      reserved.find((turno) => {
                        return (
                          turno.fecha === date.toISOString() &&
                          turno.hora === time
                        );
                      }).id
                    )
                  }
                  className="btn btn-danger"
                >
                  Eliminar turno
                </button>
              ) : (
                <form onSubmit={handleSubmit}>
                  <button
                    disabled={
                      (FechaElegida(new Date(date)).split(",")[0] ===
                        "Domingo" ||
                        FechaElegida(new Date(date)).split(",")[0] ===
                          "Sábado") & true
                    }
                    className="btn btn-success"
                  >
                    Reservar turno
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
