import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
//Components
import { Calendar } from "react-calendar";
import { ButtonTime } from "../components/ButtonTime/ButtonTime";
// Utils
import {
  turnoMañana,
  turnoTarde,
  minDate,
  actualHours,
  admin,
} from "../utils/Data";
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
import bg from "../assets/bg1.jpg";
import logo from "../assets/logoLarge.png";
const Home = () => {
  const user = useSelector((state) => state.users);
  const date = useSelector((state) => state.date.date);
  const time = useSelector((state) => state.date.hora);
  const reserved = useSelector((state) => state.turnsReserved.turns);
  const admin = useSelector((state) => state.admin.isAdmin);
  console.log(admin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  }, [admin]);

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
          fullName: user.fullName,
        });
        navigate("/turns");
      }
    }
  };

  return (
    <div>
      <div className="container-home ">
        <Link to="/turnero">
          <button
            type="button"
            className="btn btn btn-outline-light px-5 py-3 btn-lg"
          >
            Turnero
          </button>
        </Link>
        <img src={logo} alt="logo" className="img-logoLarge img-fluid" />
        <Link to="/mis-turnos">
          <button
            type="button"
            className="btn btn-outline-light px-5 py-3 btn-lg"
          >
            Mis turnos
          </button>
        </Link>
        {/* <div class="card text-bg-dark">
          <img src={bg} class="card-img img-bg" alt="..." />
          <div class="card-img-overlay">
        {/* <h5 class="card-title">Turnero</h5> */}
        {/* <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p class="card-text">Last updated 3 mins ago</p> */}
        {/* </div>
        </div> */}
        {/* <img src={bg} alt="bg" className="img-fluid img-bg" />
        <img src={logo} alt="logo" className="img-logoLarge img-fluid" /> */}
        {/* <h2>Turnero</h2>
        <p>Bienvenido/a {user.fullName}!</p> */}
        {/* <div className="calendar-container row justify-content-center">
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

      <div className="d-flex flex-wrap">
        <div className="col-6">
          <p className="mb-1">Turno mañana:</p>
          <div className="d-flex flex-wrap d-flex justify-content-evenly">
            {turnoMañana.map((horario) => {
              return (
                <div key={horario.id} className="">
                  <ButtonTime horario={horario} handleTime={handleTime} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-6">
          <p className="mb-1">Turno tarde:</p>
          <div className="d-flex flex-wrap d-flex justify-content-evenly">
            {turnoTarde.map((horario) => {
              return (
                <div key={horario.id}>
                  <ButtonTime horario={horario} handleTime={handleTime} />
                </div>
              );
            })}
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
          className="btn btn-success "
        >
          Reservar turno
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
      ) : null} */}
      </div>
    </div>
  );
};

export default Home;
