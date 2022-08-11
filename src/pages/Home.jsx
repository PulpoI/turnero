import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
//Components
import { Calendar } from "react-calendar";
import { ButtonTime } from "../components/ButtonTime/ButtonTime";
// Utils
import { turnoMañana, turnoTarde, minDate, actualHours } from "../utils/Data";
//Redux slices
import { setUser, unsetUser } from "../feactures/users/usersSlice";
import { setTurn } from "../feactures/turns/turnsSlice";
import { setDate, setTime } from "../feactures/date/dateSlice";
import { setReserved } from "../feactures/turns/turnsReserved";
// Styles
import "react-calendar/dist/Calendar.css";
import "./Home.css";
import { useFechaElegida } from "../hooks/useFechaElegida";

const Home = () => {
  const user = useSelector((state) => state.users);
  const date = useSelector((state) => state.date.date);
  const time = useSelector((state) => state.date.hora);
  const reserved = useSelector((state) => state.turnsReserved.turns);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout and remove local storage
  const handleLogout = () => {
    dispatch(unsetUser());
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.removeItem("token");
    navigate("/");
  };

  //set localstorage
  useEffect(() => {
    dispatch(
      setUser({
        email: localStorage.getItem("email"),
        phone: localStorage.getItem("phone"),
        token: localStorage.getItem("token"),
      })
    );
  }, [dispatch]);

  //Load turns reserved
  useEffect(() => {
    Axios.get("http://localhost:5000/turnos").then((response) => {
      const data = response.data;
      dispatch(
        setReserved({
          turns: data,
        })
      );
    });
  }, [dispatch]);

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
          })
        );
        Axios.post("http://localhost:5000/turnos", {
          email: user.email,
          phone: user.phone,
          fecha: date,
          hora: time,
          disponible: false,
        })
        .catch((error) => {
          console.log(error);
        });
        navigate("/turns");
      }
    }
  };

  return (
    <div className=" container-fluid">
      <h2>Home</h2>
      <p>Welcome {user.email}</p>
      <button onClick={handleLogout}>Log out</button>
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
        <h5 className="text-center">{useFechaElegida(date)}</h5>
      </div>
      <div className="container">
        <p className="mb-1">Turno mañana:</p>
        <div className="d-flex flex-wrap d-flex justify-content-between">
          {turnoMañana.map((horario) => {
            return (
              <div key={horario.id} className="">
                <ButtonTime horario={horario} handleTime={handleTime} />
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
                <ButtonTime horario={horario} handleTime={handleTime} />
              </div>
            );
          })}
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
                new Date(minDate).toLocaleDateString("en-GB")) & true
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
      ) : null}
    </div>
  );
};

export default Home;