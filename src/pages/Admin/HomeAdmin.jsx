import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//Components
import BgMain from "../../components/BgMain/BgMain";
import CalendarSet from "../../components/CalendarSet/CalendarSet";
import { ModalContainer } from "../../components/ModalContainer/ModalContainer";
// Utils
import { turnoMañana, turnoTarde } from "../../utils/Data";
import { FechaElegida } from "../../hooks/FechaElegida";
import IrArriba from "../../hooks/IrArriba";
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
import { swalWithBootstrapButtons } from "../../hooks/swalWithBootstrapButtons";

const Home = () => {
  const user = useSelector((state) => state.users);
  const date = useSelector((state) => state.date.date);
  const turn = useSelector((state) => state.turns);
  const reserved = useSelector((state) => state.turnsReserved.turns);
  const time = useSelector((state) => state.date.hora);
  const dateIso = date.toISOString();
  const dateWekend = FechaElegida(date).split(",", 1).toString();

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
    IrArriba();
    setLoading(true);
    if (time === "") {
      alert("Seleccione una hora");
    } else if ((dateWekend === "Sábado") | "Domingo") {
      alert("No podes reservar turno un fin de semana. Elegí otro dia");
      setLoading(false);
    } else {
      if (
        reserved
          .map((turn) => {
            return turn.fecha === date && turn.hora === time;
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
          fullName: "admin",
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

  const cancelTurn = (id) => {
    swalWithBootstrapButtons
      .fire({
        title: "Estas seguro?",
        text: "No podrás volver a recuperar esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar turno!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const turnDoc = doc(db, "turnos", id);
          await deleteDoc(turnDoc);
          swalWithBootstrapButtons.fire(
            "Turno eliminado!",
            "El turno ha sido eliminado.",
            "success"
          );
        }
        getTurns();
      });
  };

  return (
    <>
      <div className="container-fluid p-0">
        <BgMain title="TURNERO" />
        {loading ? (
          <Loader />
        ) : (
          <div className="container-turnero ">
            <p className="text-center mb-1 my-4">Bienvenido {user.email}!</p>
            <div className="container-xl my-5 ">
              <div className="row">
                <CalendarSet handleDate={handleDate} date={date} />
                <div className="d-flex col flex-wrap">
                  <ModalContainer
                    turnChoose={turnoMañana}
                    handleTime={handleTime}
                    turn={turn}
                    cancelTurn={cancelTurn}
                    handleSubmit={handleSubmit}
                    turnName={"Turno mañana:"}
                  />
                  <ModalContainer
                    turnChoose={turnoTarde}
                    handleTime={handleTime}
                    turn={turn}
                    cancelTurn={cancelTurn}
                    handleSubmit={handleSubmit}
                    turnName={"Turno tarde:"}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
