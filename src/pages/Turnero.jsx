import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//Components
import BgMain from "../components/BgMain/BgMain";
import CalendarSet from "../components/CalendarSet/CalendarSet";
import ButtonTimeContainer from "../components/ButtonTimeContainer/ButtonTimeContainer";
// Utils
import { turnoMañana, turnoTarde } from "../utils/Data";
import { FechaElegida } from "../hooks/FechaElegida";
import IrArriba from "../hooks/IrArriba";
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
import ButtonReserve from "../components/ButtonReserve/ButtonReserve";

const Turnero = () => {
  const user = useSelector((state) => state.users);
  const date = useSelector((state) => state.date.date);
  const time = useSelector((state) => state.date.hora);
  const reserved = useSelector((state) => state.turnsReserved.turns);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dateIso = date.toISOString();
  const dateWekend = FechaElegida(date).split(",", 1).toString();

  const [loading, setLoading] = useState(false);
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
    IrArriba();
    setLoading(true);
    if (time === "") {
      alert("Seleccione una hora");
    } else if ((dateWekend === "Sábado") | "Domingo") {
      alert("No podes reservar turno un fin de semana. Elegí otro dia");
      setLoading(false);
    } else {
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
              confirmButtonColor: "#212529",
            });
          }, 800);
        });
      }
    }
  };
  return (
    <div className="container-fluid p-0">
      <BgMain title="TURNERO" />
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
                <CalendarSet handleDate={handleDate} date={date} />
                <div className="d-flex col flex-wrap ">
                  <ButtonTimeContainer
                    turnChoose={turnoMañana}
                    handleTime={handleTime}
                    turnName={"Turno mañana:"}
                  />
                  <ButtonTimeContainer
                    turnChoose={turnoTarde}
                    handleTime={handleTime}
                    turnName={"Turno tarde:"}
                  />
                </div>
              </div>
            </div>
            <ButtonReserve
              handleSubmit={handleSubmit}
              reserved={reserved}
              date={date}
              time={time}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Turnero;
