import Axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReserved } from "../feactures/turns/turnsReserved";
import { setUser } from "../feactures/users/usersSlice";
import { useFechaElegida } from "../utils/Data";

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

  const reservedTurns = reserved.filter((turn) => turn.email === user.email);

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
      {/* <p>{useFechaElegida(reservedTurns[0].fecha)}</p> */}
      <div className="turns">
        {reservedTurns.map((turn) => (
          <div key={turn.id} className="d-flex justify-content-center p-3">
            <h5 className="p-2">
              {new Date(turn.fecha).toLocaleDateString("en-GB")} a las{" "}
              {turn.hora}
            </h5>

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
