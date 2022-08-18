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
    navigate("/mis-turnos");
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

  useEffect(() => {
    getProductById(id);
  }, []);

  return (
    <div>
      <h2>Editar Turno</h2>
      <form onSubmit={update}>
        <div className="mb-3">
          <label className="form-label">Nombre y apellido</label>
          <input
            type="text"
            className="form-control"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="number"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default EditTurn;
