import { useEffect, useState } from "react";
import { doc, updateDoc, getDoc } from "@firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";
const EditTurn = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    const turn = doc(db, "turnos", id);
    const data = { fullName: fullName, phone: phone };
    await updateDoc(turn, data);
    navigate(-1);
  };

  const getProductById = async (id) => {
    const turn = await getDoc(doc(db, "turnos", id));
    if (turn.exists) {
      setFullName(turn.data().fullName);
      setPhone(turn.data().phone);
    } else {
      console.log("No existe el producto");
    }
  };
  function backEdit() {
    navigate(1);
  }

  useEffect(() => {
    getProductById(id);
  }, [id]);

  return (
    <div className="col  form-section my-4">
      <div className="login-wrapper  border border-1 rounded p-3">
        <h2 className="login-title">Editar Turno</h2>
        <form onSubmit={update}>
          <div className="form-group">
            <label className="sr-only">Nombre y Apellido</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          </div>
          <div className="form-group mb-3">
            <label className="sr-only">Teléfono</label>
            <input
              type="number"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-evenly align-items-center ">
            <button className="btn btn-dark" type="submit">
              {" "}
              Actualizar turno
            </button>
            <button onClick={() => backEdit()} className="btn btn-outline-dark">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTurn;
