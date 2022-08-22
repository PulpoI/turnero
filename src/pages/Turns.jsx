import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReserved } from "../feactures/turns/turnsReserved";
//Firebase
import { collection, getDocs, doc, deleteDoc } from "@firebase/firestore";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";
import { FechaElegida } from "../hooks/FechaElegida";
import BgMain from "../components/BgMain/BgMain";
import irArriba from "../hooks/IrArriba";
import { swalWithBootstrapButtons } from "../hooks/swalWithBootstrapButtons";

const Turns = () => {
  const reserved = useSelector((state) => state.turnsReserved.turns);
  const user = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const reservedCollection = collection(db, "turnos");

  //Load turns reserved
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
    <div className="">
      <BgMain title="MIS TURNOS" />
      <div className="table-responsive-md">
        <table className="table table-striped table-hover ">
          <thead>
            <tr className="table-dark sticky-top">
              <th scope="col">
                {" "}
                <span className="p-3">Fecha</span>
              </th>
              <th scope="col">Hora</th>
              <th scope="col">Nombre y apellido</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Email/Usuario</th>
              <th scope="col">Editar</th>
              {/* {user.email === "admin@admin.com" ? (
                <th scope="col">Editar</th>
              ) : null} */}

              <th scope="col">Cancelar</th>
            </tr>
          </thead>
          <tbody>
            {reservedOrganized.map((turn) => (
              <tr key={turn.id}>
                <td>
                  <span className="p-3">
                    {new Date(turn.fecha).toLocaleDateString("en-GB")} (
                    {FechaElegida(new Date(turn.fecha)).split(",")[0]})
                  </span>
                </td>
                <td className="table-secondary">{turn.hora}</td>
                <td>{turn.fullName}</td>
                <td>{turn.phone}</td>
                <td>{turn.email}</td>
                <td>
                  <Link to={`/editar-turno/${turn.id}`}>
                    <button
                      onClick={() => irArriba()}
                      className="btn btn-warning"
                    >
                      Editar
                    </button>
                  </Link>
                </td>
                {/* {turn.email === "admin@admin.com" ? (
                  <td>
                    <Link to={`/editar-turno/${turn.id}`}>
                      <button className="btn btn-warning">Editar</button>
                    </Link>
                  </td>
                ) : null} */}
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => cancelTurn(turn.id)}
                  >
                    Cancelar
                  </button>
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
