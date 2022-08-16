import Axios from "axios";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../feactures/users/usersSlice";
import { Link, useNavigate } from "react-router-dom";
import { Switch, FormControlLabel } from "@mui/material";
import { setAdmin } from "../feactures/admin/adminSlice";
import { SetLoginStorage } from "../hooks/SetLoginStorage";
import { collection, getDocs, deleteDoc, doc } from "@firebase/firestore";
import { db } from "../firebase/firebase";

const Login = () => {
  const [switchValue, setSwitchValue] = useState(false);

  const adminCollection = collection(db, "admins");
  const userCollection = collection(db, "users");

  const adminField = useRef(null);
  const emailField = useRef(null);
  const passwordField = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    switchValue ? adminLogin() : userLogin();
  };

  const userLogin = async () => {
    const data = await getDocs(userCollection);
    const user = data.docs.find(
      (user) =>
        user.data().email === emailField.current.value &&
        user.data().phone === passwordField.current.value
    );
    if (user) {
      dispatch(
        setUser({
          email: user.data().email,
          phone: user.data().phone,
          token: new Date(),
          fullName: user.data().fullName,
        })
      );
      SetLoginStorage(user.data());
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  const adminLogin = async () => {
    const data = await getDocs(adminCollection);

    const admin = data.docs.find(
      (admin) =>
        admin.data().email === emailField.current.value &&
        admin.data().phone === passwordField.current.value &&
        admin.data().credential === adminField.current.value
    );
    if (admin) {
      dispatch(setUser(admin.data()));
      dispatch(setAdmin({ isAdmin: true }));
      SetLoginStorage(admin.data());
      localStorage.setItem("isAdmin", true);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="justify-content-center">
      <div className="">
        <h2 className="mb-4">Inicia sesión o crea una cuenta nueva</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email o Usuario</label>
            <input type="text" className="form-control" ref={emailField} />
          </div>
          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              type="password"
              className="form-control"
              ref={passwordField}
            />
          </div>
          <FormControlLabel
            control={
              <Switch
                value={switchValue}
                onChange={() => setSwitchValue(!switchValue)}
                name="switch"
                color="secondary"
              />
            }
            label="¿Sos administrador?"
            className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
          />

          {switchValue && (
            <div>
              <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Por favor, introduce tu credencial
              </label>
              <input type="text" ref={adminField} />
            </div>
          )}

          <button type="submit" className="btn btn-primary">
            Iniciar sesión
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-400">
          No tenes una cuenta?{" "}
          <Link
            to="/register"
            href="#"
            className="text-blue-500 focus:outline-none focus:underline hover:underline"
          >
            Registrate
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
