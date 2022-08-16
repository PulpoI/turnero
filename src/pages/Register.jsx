import Axios from "axios";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../feactures/users/usersSlice";
import { Link, useNavigate } from "react-router-dom";
import { SetLoginStorage } from "../hooks/SetLoginStorage";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "@firebase/firestore";
import { db } from "../firebase/firebase";

const Register = () => {
  const userCollection = collection(db, "users");

  const emailField = useRef(null);
  const passwordField = useRef(null);
  const fullNameField = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await getDocs(userCollection);
    const user = data.docs.find(
      (user) => user.data().email === emailField.current.value
    );
    if (user) {
      alert("Usuario ya existe, elija otro email o usuario");
    } else {
      await addDoc(userCollection, {
        email: emailField.current.value,
        phone: passwordField.current.value,
        fullName: fullNameField.current.value,
        id: Date.now(),
      });
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="">
        <h2 className="mb-4">REGISTER</h2>
        <form className="mx-5" onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <label className="form-label">Email o Usuario</label>
            <input type="text" className="form-control" ref={emailField} />
          </div>
          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input type="number" className="form-control" ref={passwordField} />
          </div>
          <div className="mb-3">
            <label className="form-label">Nombre y apellido</label>
            <input type="text" className="form-control" ref={fullNameField} />
          </div>
          <button type="submit" className="btn btn-primary">
            Registrarme
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-400">
          Tenes una cuenta?{" "}
          <Link
            to="/login"
            href="#"
            className="text-blue-500 focus:outline-none focus:underline hover:underline"
          >
            Iniciar sesión
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;
