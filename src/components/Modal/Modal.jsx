import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FechaElegida } from "../../hooks/FechaElegida";
import { actualHours, minDate } from "../../utils/Data";

const Modal = ({
  horario,
  handleTime,
  fullName,
  email,
  phone,
  cancelTurn,
  handleSubmit,
  turnId,
}) => {
  const date = useSelector((state) => state.date.date);
  const time = useSelector((state) => state.date.hora);
  const reserved = useSelector((state) => state.turnsReserved.turns);
  const admin = useSelector((state) => state.admin.isAdmin);

  return (
    <>
      {/* Button trigger modal */}

      <button
        disabled={
          !admin &&
          reserved.find((turno) => {
            return (
              turno.fecha === date.toISOString() && turno.hora === horario.title
            );
          })
            ? true
            : false ||
              (actualHours > horario.title && true) &
                (date.toISOString() === new Date(minDate).toISOString())
            ? true
            : false
        }
        onClick={handleTime}
        type="button"
        className={
          reserved.find((turno) => {
            return (
              turno.fecha === date.toISOString() && turno.hora === horario.title
            );
          })
            ? "btn btn-danger mt-2 px-5 py-3"
            : "btn btn-outline-dark mt-2 px-5 py-3" && time === horario.title
            ? "btn btn-dark mt-2 px-5 py-3"
            : "btn btn-outline-dark mt-2 px-5 py-3"
        }
        value={horario.title}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        {horario.title}
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {time}
              </h5>
            </div>

            <div className="modal-body">
              {fullName && email && phone ? (
                <>
                  <p>{FechaElegida(date)}</p>
                  <h3>Nombre: {fullName} </h3>
                  <h4>Email/User: {email}</h4>
                  <h4>Tel: {phone}</h4>
                </>
              ) : (
                <>
                  <p>{FechaElegida(date)}</p>
                  <h3>Turno disponible</h3>
                </>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-dark"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              {email === "admin@admin.com" ? (
                <Link to={`/editar-turno/${turnId}`}>
                  <button className="btn btn-warning" data-bs-dismiss="modal">
                    Editar
                  </button>
                </Link>
              ) : null}
              {fullName && email && phone ? (
                <button
                  type="button"
                  onClick={() =>
                    cancelTurn(
                      reserved.find((turno) => {
                        return (
                          turno.fecha === date.toISOString() &&
                          turno.hora === time
                        );
                      }).id
                    )
                  }
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Cancelar turno
                </button>
              ) : (
                <form onSubmit={handleSubmit}>
                  <button
                    disabled={
                      (FechaElegida(new Date(date)).split(",")[0] ===
                        "Domingo" ||
                        FechaElegida(new Date(date)).split(",")[0] ===
                          "Sábado") & true
                    }
                    className="btn btn-dark"
                    data-bs-dismiss="modal"
                    type="submit"
                  >
                    Reservar turno
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
