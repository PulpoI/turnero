import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReserved } from "../../feactures/turns/turnsReserved";
import { setPassed } from "../../feactures/turns/turnsPassed";
import { FechaElegida } from "../../hooks/FechaElegida";
//Firebase
import { collection, getDocs, deleteDoc, doc } from "@firebase/firestore";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import BgMain from "../../components/BgMain/BgMain";
import IrArriba from "../../hooks/IrArriba";
const Turns = () => {
  const reserved = useSelector((state) => state.turnsReserved.turns);
  const reservedCollection = collection(db, "turnos");
  const datePassed = useSelector((state) => state.turnsPassed.passed);
  const dispatch = useDispatch();

  const getTurns = async () => {
    const data = await getDocs(reservedCollection);
    //filter data passing the date
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const filterData = data.docs.filter((doc) => {
      return doc.data().fecha >= yesterday.toISOString();
    });
    dispatch(
      setReserved({
        turns: filterData.map((doc) => ({ ...doc.data(), id: doc.id })),
      })
    );

    const filterDataPassed = data.docs.filter((doc) => {
      return doc.data().fecha < yesterday.toISOString();
    });
    dispatch(
      setPassed({
        passed: filterDataPassed.map((doc) => ({ ...doc.data(), id: doc.id })),
      })
    );
  };
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

  useEffect(() => {
    getTurns();
    if (datePassed.length > 0) {
      cancelTurn(datePassed[0].id);
    }
  }, []);

  const cancelTurn = async (id) => {
    const turnDoc = doc(db, "turnos", id);
    await deleteDoc(turnDoc);
    getTurns();
  };

  return (
    <div className="container-fluid p-0">
      <BgMain title="TODOS LOS TURNOS" />
      <div className="table-responsive-md">
        <table className="table table-striped table-hover ">
          <thead>
            <tr className="table-dark sticky-top">
              <th scope="col">
                <span className="p-3">Fecha</span>
              </th>
              <th scope="col">Hora</th>
              <th scope="col">Nombre y apellido</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Email/Usuario</th>
              <th scope="col">Editar</th>
              <th scope="col">Cancelar</th>
            </tr>
          </thead>
          <tbody>
            {organizedTurns.map((turn) => (
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
                  {" "}
                  <Link to={`/editar-turno/${turn.id}`}>
                    <button
                      onClick={() => IrArriba()}
                      className="btn btn-warning"
                    >
                      Editar
                    </button>
                  </Link>
                  {/* {turn.email === "admin@admin.com" ? (
                    <Link to={`/editar-turno/${turn.id}`}>
                      <button className="btn btn-warning">Editar</button>
                    </Link>
                  ) : null} */}
                </td>
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
