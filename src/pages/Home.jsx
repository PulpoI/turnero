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
      </div>
    </div>
  );
};

export default Home;
