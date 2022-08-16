import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReserved } from "../../feactures/turns/turnsReserved";
import { setUser } from "../../feactures/users/usersSlice";
import { setAdmin } from "../../feactures/admin/adminSlice";
import { FechaElegida } from "../../hooks/FechaElegida";
//Firebase
import { collection, getDocs, deleteDoc, doc } from "@firebase/firestore";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";

const Turns = () => {
  const date = useSelector((state) => state.date.date);
  const reserved = useSelector((state) => state.turnsReserved.turns);
  const reservedCollection = collection(db, "turnos");
  const dateIso = date.toISOString();

  const dispatch = useDispatch();

  const getTurns = async () => {
    const data = await getDocs(reservedCollection);
    //filter data passing the date
    const filterData = data.docs.filter((doc) => {
      return doc.data().fecha >= dateIso;
    });
    dispatch(
      setReserved({
        turns: filterData.map((doc) => ({ ...doc.data(), id: doc.id })),
      })
    );
  };

  useEffect(() => {
    getTurns();
  }, []);

  //set localstorage
  useEffect(() => {
    dispatch(
      setUser({
        email: localStorage.getItem("email"),
        phone: localStorage.getItem("phone"),
        token: localStorage.getItem("token"),
      })
    );
    dispatch(setAdmin({ isAdmin: localStorage.getItem("isAdmin") }));
  }, [dispatch]);

  //turns organized for time and date
  const organizeTurns = (turns) => {
    const organized = [];
    turns.forEach((turn) => {
      if (turn.fecha) {
        organized.push(turn);
      }
    });
    organized.sort((a, b) => {
      return a.hora.localeCompare(b.hora);
    });
    organized.sort((a, b) => {
      return a.fecha.localeCompare(b.fecha);
    });
    return organized;
  };

  const organizedTurns = organizeTurns(reserved);

  const cancelTurn = async (id) => {
    const turnDoc = doc(db, "turnos", id);
    await deleteDoc(turnDoc);
    getTurns();
  };

  return (
    <div className="">
      <h1 className="text-center pb-3">Todos los turnos</h1>
      <div className="table-responsive-md">
        <table className="table table-striped table-hover ">
          <thead>
            <tr className="table-dark sticky-top">
              <th scope="col">Fecha</th>
              <th scope="col">Hora</th>
              <th scope="col">Nombre y apellido</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Email/Usuario</th>
              <th scope="col">Cancelar</th>
            </tr>
          </thead>
          <tbody>
            {organizedTurns.map((turn) => (
              <tr key={turn.id}>
                <td>
                  {new Date(turn.fecha).toLocaleDateString("en-GB")} (
                  {FechaElegida(new Date(turn.fecha)).split(",")[0]})
                </td>
                <td className="table-info">{turn.hora}</td>
                <td>{turn.fullName}</td>
                <td>{turn.phone}</td>
                <td>{turn.email}</td>

                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => cancelTurn(turn.id)}
                  >
                    Cancelar
                  </button>
                  {turn.email === "admin@admin.com" ? (
                    <Link to={`/edit/${turn.id}`}>
                      <button className="btn btn-success">Editar</button>
                    </Link>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Turns;
