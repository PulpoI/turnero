import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//Components
import { Calendar } from "react-calendar";
import Modal from "../../components/Modal/Modal";
// Utils
import { turnoMañana, turnoTarde, minDate } from "../../utils/Data";
import { FechaElegida } from "../../hooks/FechaElegida";
import Loader from "../../components/Loader/Loader";
//Redux slices
import { setTurn, unsetTurn } from "../../feactures/turns/turnsSlice";
import { setDate, setTime } from "../../feactures/date/dateSlice";
import { setReserved } from "../../feactures/turns/turnsReserved";
//Firebase
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
} from "@firebase/firestore";
import { db } from "../../firebase/firebase";
// Styles
import "react-calendar/dist/Calendar.css";
import ".././Home.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const user = useSelector((state) => state.users);
  const date = useSelector((state) => state.date.date);
  const turn = useSelector((state) => state.turns);
  const reserved = useSelector((state) => state.turnsReserved.turns);
  const time = useSelector((state) => state.date.hora);
  const dateIso = date.toISOString();

  const turnsCollection = collection(db, "turnos");

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTurns = async () => {
    const data = await getDocs(turnsCollection);
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
    // set turn for user
    const turno = reserved.find((turno) => {
      return turno.fecha === dateIso && turno.hora === date.target.value;
    });
    if (turno) {
      dispatch(
        setTurn({
          email: turno.email,
          phone: turno.phone,
          fullName: turno.fullName,
          fecha: dateIso,
          hora: date.target.value,
          id: turno.id,
        })
      );
    } else {
      dispatch(unsetTurn());
    }
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
        await addDoc(turnsCollection, {
          email: user.email,
          phone: user.phone,
          fecha: date.toISOString(),
          hora: time,
          disponible: false,
          fullName: "admin",
        }).finally(() => {
          Swal.fire({
            title: "Turno reservado!",
            text: `Tu turno ha sido reservado el dia ${date.toLocaleDateString(
              "en-GB"
            )} (${FechaElegida(date).split(",")[0]}) a las ${time}hs.`,
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        });
        setTimeout(() => {
          navigate("/turns");
        }, 1000);
      }
    }
  };

  const cancelTurn = async (id) => {
    const turnDoc = doc(db, "turnos", id);
    await deleteDoc(turnDoc);
    getTurns();
  };

  return (
    <div className=" container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2>Turnero ADMIN</h2>
          <p>Bienvenido {user.email}!</p>
          <div className="calendar-container row justify-content-center">
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
            <h5 className="text-center">{FechaElegida(date)}</h5>
          </div>
          <div className="container">
            <p className="mb-1">Turno mañana:</p>
            <div className="d-flex flex-wrap d-flex justify-content-between">
              {turnoMañana.map((horario) => {
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
          <div className="container">
            <p className="mb-1">Turno tarde:</p>
            <div className="d-flex flex-wrap d-flex justify-content-between">
              {turnoTarde.map((horario) => {
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
        </>
      )}
    </div>
  );
};

export default Home;
