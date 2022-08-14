import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
//Components
import { Calendar } from "react-calendar";
import Modal from "../../components/Modal/Modal";
// Utils
import { turnoMañana, turnoTarde, minDate } from "../../utils/Data";
import { FechaElegida } from "../../hooks/FechaElegida";
//Redux slices
import { setUser } from "../../feactures/users/usersSlice";
import { setTurn, unsetTurn } from "../../feactures/turns/turnsSlice";
import { setAdmin } from "../../feactures/admin/adminSlice";
import { setDate, setTime } from "../../feactures/date/dateSlice";
import { setReserved } from "../../feactures/turns/turnsReserved";
// Styles
import "react-calendar/dist/Calendar.css";
import ".././Home.css";

const Home = () => {
  const user = useSelector((state) => state.users);
  const date = useSelector((state) => state.date.date);
  const turn = useSelector((state) => state.turns);
  const reserved = useSelector((state) => state.turnsReserved.turns);
  const dateIso = date.toISOString();
  const dispatch = useDispatch();

  //set localstorage
  useEffect(() => {
    dispatch(
      setUser({
        email: localStorage.getItem("email"),
        phone: localStorage.getItem("phone"),
        token: localStorage.getItem("token"),
        fullName: localStorage.getItem("fullName"),
      })
    );
    dispatch(setAdmin({ isAdmin: localStorage.getItem("isAdmin") }));
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
  //setTurn and Reserve turn
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    // if (time === "") {
    //   alert("Seleccione una hora");
    // } else {
    //   if (
    //     reserved
    //       .map((turn) => {
    //         return turn.fecha === date && turn.hora === time;
    //       })
    //       .includes(true)
    //   ) {
    //     alert("Ya hay un turno reservado para esa fecha y hora");
    //   } else {
    //     dispatch(
    //       setTurn({
    //         email: user.email,
    //         phone: user.phone,
    //         fecha: date,
    //         hora: time,
    //         disponible: false,
    //         fullName: user.fullName,
    //       })
    //     );
    //     Axios.post("http://localhost:5000/turnos", {
    //       email: user.email,
    //       phone: user.phone,
    //       fecha: date,
    //       hora: time,
    //       disponible: false,
    //     }).catch((error) => {
    //       console.log(error);
    //     });
    //     navigate("/turns");
    //   }
    // }
  };

  return (
    <div className=" container-fluid">
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
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
