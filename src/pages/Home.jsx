import React, { useEffect, useState } from "react";
import Axios from "axios";

import { Calendar } from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unsetUser } from "../feactures/users/usersSlice";

import { setTurn } from "../feactures/turns/turnsSlice";
import { setDate, setTime } from "../feactures/date/dateSlice";
import { horariosTurnos } from "../utils/Data";
import "react-calendar/dist/Calendar.css";
import "./Home.css";
import { setReserved } from "../feactures/turns/turnsReserved";
const Home = () => {
  const user = useSelector((state) => state.users);
  const date = useSelector((state) => state.date.date);
  const time = useSelector((state) => state.date.hora);
  const reserved = useSelector((state) => state.turnsReserved.turns);

  console.log(date.toISOString());
  const dispatch = useDispatch();

  const navigate = useNavigate();
  //date months
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  //date days
  const dias_semana = [
    "Domingo",
    "Lunes",
    "martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const fechaElegida =
    dias_semana[date.getDay()] +
    ", " +
    date.getDate() +
    " de " +
    meses[date.getMonth()] +
    " de " +
    date.getUTCFullYear();

  const handleLogout = () => {
    dispatch(unsetUser());
    navigate("/");
  };

  // const handleChange = (date) => {
  //   setDate(date);
  //   Axios.get("http://localhost:5000/turnos").then((response) => {
  //     const turnos = response.data;
  //     const turno = turnos.map((turno) => {
  //       return turno.fecha;
  //     });

  //     const turnoDate = turno.find((turno) => {
  //       return turno === fechaElegida;
  //     });
  //     if (turnoDate) {
  //       console.log("turno no disponible");
  //     }
  //   });
  // };

  /*
   dispatch(
      setTurn({
        email: user.email,
        phone: user.phone,
        fecha: date,
        hora: "10:30",
        disponible: false,
      })
    );
  */

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

  const handleChange = (date) => {
    dispatch(
      setTime({
        hora: date.target.value,
      })
    );
  };

  const cambiarFechaSelecionada = (date) => {
    dispatch(
      setDate({
        date: date,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    navigate("/turnos");
  };

  return (
    <>
      <h2>Home</h2>
      <p>Welcome {user.email}</p>
      <button onClick={handleLogout}>Log out</button>
      <div className="calendar-container">
        <Calendar
          tileDisabled={({ date }) =>
            date.getDay() === 0 || date.getDay() === 6
          }
          onChange={cambiarFechaSelecionada}
          value={date}
          locale={"es-ES"}
        />
        <p>Fecha: {fechaElegida}</p>
      </div>
      <div>
        {horariosTurnos.map((horario) => {
          return (
            <div key={horario.id}>
              <button
                disabled={
                  reserved.find((turno) => {
                    return (
                      turno.fecha === date.toISOString() &&
                      turno.hora === horario.title
                    );
                  })
                    ? true
                    : false
                }
                className={
                  time === horario.title
                    ? "btn btn-primary"
                    : "btn btn-outline-primary" &&
                      reserved.find((turno) => {
                        return (
                          turno.fecha === date.toISOString() &&
                          turno.hora === horario.title
                        );
                      })
                    ? "btn btn-danger"
                    : "btn btn-outline-primary"
                }
                value={horario.title}
                onClick={handleChange}
              >
                {" "}
                {horario.title}
              </button>
            </div>
          );
        })}
        <p>Horario: {time}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <button
          disabled={
            reserved.find((turno) => {
              return turno.fecha === date.toISOString() && turno.hora === time;
            })
              ? true
              : false
          }
          className="btn btn-success"
        >
          Reservar turno
        </button>
      </form>
    </>
  );
};

export default Home;
