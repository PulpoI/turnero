import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//Components
import { Calendar } from "react-calendar";
import { ButtonTime } from "../components/ButtonTime/ButtonTime";
// Utils
import { turnoMañana, turnoTarde, minDate, actualHours } from "../utils/Data";
import { FechaElegida } from "../hooks/FechaElegida";
//Redux slices
import { setDate, setTime } from "../feactures/date/dateSlice";
import { setReserved } from "../feactures/turns/turnsReserved";
//Firebase
import { collection, getDocs, addDoc } from "@firebase/firestore";
import { db } from "../firebase/firebase";
// Styles
import "react-calendar/dist/Calendar.css";
import "./Home.css";
import Loader from "../components/Loader/Loader";
import Swal from "sweetalert2";

const Turnero = () => {
  const user = useSelector((state) => state.users);
  const date = useSelector((state) => state.date.date);
  const time = useSelector((state) => state.date.hora);
  const reserved = useSelector((state) => state.turnsReserved.turns);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dateIso = date.toISOString();

  console.log(time, date, reserved);

  const reservedCollection = collection(db, "turnos");
  const turnsCollection = collection(db, "turnos");

  const getTurns = async () => {
    const data = await getDocs(reservedCollection);
    dispatch(
      setReserved({
        turns: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      })
    );
  };

  useEffect(() => {
    getTurns();
  }, []);

  //setTime
  const handleTime = (date) => {
    dispatch(
      setTime({
        hora: date.target.value,
      })
    );
  };
  //setDate
  const handleDate = (date) => {
    dispatch(
      setDate({
        date: date,
      })
    );
  };

  //Reserve turn
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (time === "") {
      alert("Seleccione una hora");
    }
    if (
      await reserved
        .map((turn) => {
          return turn.fecha === dateIso && turn.hora === time;
        })
        .includes(true)
    ) {
      alert("Ya hay un turno reservado para esa fecha y hora");
      setLoading(false);
    } else {
      await addDoc(turnsCollection, {
        email: user.email,
        phone: user.phone,
        fecha: date.toISOString(),
        hora: time,
        disponible: false,
        fullName: user.fullName,
      }).finally(() => {
        setTimeout(() => {
          setLoading(false);
          navigate("/mis-turnos");
          Swal.fire({
            title: "Turno reservado!",
            text: `Tu turno ha sido reservado el dia ${date.toLocaleDateString(
              "en-GB"
            )} (${FechaElegida(date).split(",")[0]}) a las ${time}hs.`,
            icon: "success",
            confirmButtonText: "Aceptar",
            position: "center",
            cancelButtonColor: "#212529",
          });
        }, 1000);
      });
    }
  };
  return (
    <div className="d-flex justify-content-center container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container-turnero ">
            <p className="text-center mb-1 mt-4">
              Bienvenido/a {user.fullName}! <br></br>
              Selecciona la fecha y hora para reservar tu turno.
            </p>
            <div className="container-xl mt-4 ">
              <div className="row">
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

                <div className="d-flex col flex-wrap ">
                  <div className="col-6 border border-1 rounded">
                    <p className="mb-1 text-center">Turno mañana:</p>
                    <div className="d-flex flex-wrap d-flex justify-content-evenly">
                      {turnoMañana.map((horario) => {
                        return (
                          <div key={horario.id}>
                            <ButtonTime
                              horario={horario}
                              handleTime={handleTime}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="col-6 border border-1 rounded">
                    <p className="mb-1 text-center">Turno tarde:</p>
                    <div className="d-flex flex-wrap d-flex justify-content-evenly">
                      {turnoTarde.map((horario) => {
                        return (
                          <div key={horario.id}>
                            <ButtonTime
                              horario={horario}
                              handleTime={handleTime}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="d-flex justify-content-center mb-3 mt-3"
            >
              <button
                disabled={
                  reserved.find((turno) => {
                    return (
                      turno.fecha === date.toISOString() && turno.hora === time
                    );
                  }) ||
                  time === "" ||
                  (actualHours > time &&
                    date.toLocaleDateString("en-GB") ===
                      new Date(minDate).toLocaleDateString("en-GB")) & true ||
                  (FechaElegida(new Date(date)).split(",")[0] === "Domingo" ||
                    FechaElegida(new Date(date)).split(",")[0] === "Sábado") &
                    true
                    ? true
                    : false
                }
                className="btn btn-dark btn-lg btn-block"
              >
                !Reservar turno!
              </button>
            </form>
            {actualHours > time &&
            time !== "" &&
            (date.toLocaleDateString("en-GB") ===
              new Date(minDate).toLocaleDateString("en-GB")) &
              true ? (
              <p className="text-danger text-center">
                No puedes reservar un turno en el pasado, elige otro horario.
              </p>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default Turnero;
