import Axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReserved } from "../feactures/turns/turnsReserved";
import { setUser } from "../feactures/users/usersSlice";

const Turns = () => {
  const reserved = useSelector((state) => state.turnsReserved.turns);
  const user = useSelector((state) => state.users);

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

  //turns filtered for user
  const reservedTurns = reserved.filter((turn) => turn.email === user.email);
  //turns organized for time and date
  const reservedOrganizedTime = reservedTurns
    .slice()
    .sort((a, b) => a.hora.replace(/:/g, "") - b.hora.replace(/:/g, ""));
  const reservedOrganized = reservedOrganizedTime
    .slice()
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  //function to cancel turn
  const cancelTurn = (id) => {
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
    <div className="">
      <h1 className="text-center pb-3">Mis turnos</h1>
      <div className="turns">
        {reservedOrganized.map((turn) => (
          <div key={turn.id} className="d-flex justify-content-center p-3">
            <div className="p-2">
              {new Date(turn.fecha).toLocaleDateString("en-GB")} a las{" "}
              {turn.hora}
            </div>
            <button
              className="btn btn-danger"
              onClick={() => cancelTurn(turn.id)}
            >
              Cancelar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Turns;
