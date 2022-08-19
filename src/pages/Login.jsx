import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../feactures/users/usersSlice";
import { Link, useNavigate } from "react-router-dom";
import { Switch, FormControlLabel } from "@mui/material";
import { setAdmin } from "../feactures/admin/adminSlice";
import { SetLoginStorage } from "../hooks/SetLoginStorage";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebase/firebase";
import "./Login.css";
import logo from "../assets/logo.png";
import LeftAuth from "../components/LeftAuth/LeftAuth";

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
      navigate("/turnero");
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
      navigate("/turnero");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div class="container-fluid ">
      <div class="row">
        <LeftAuth auth="Registrate" pathAuth={"/register"} />
        <div class="col-sm-6 col-md-5 form-section">
          <div class="login-wrapper">
            <h2 class="login-title">Iniciá sesión</h2>
            <form onSubmit={handleSubmit}>
              <div class="form-group">
                <label class="sr-only">Email / Usuario</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email / Usuario"
                  ref={emailField}
                />
              </div>
              <div class="form-group mb-3">
                <label class="sr-only">Teléfono</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Teléfono"
                  ref={passwordField}
                />
              </div>
              <FormControlLabel
                control={
                  <Switch
                    value={switchValue}
                    onChange={() => setSwitchValue(!switchValue)}
                    name="switch"
                    color="default"
                  />
                }
                label="¿Sos administrador?"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              />

              {switchValue && (
                <div>
                  <label className="sr-only">
                    Por favor, introduce tu credencial
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Credencial"
                    ref={adminField}
                  />
                </div>
              )}
              <div class="d-flex justify-content-between align-items-center mb-5">
                <button class="btn btn-dark" type="submit">
                  {" "}
                  Iniciar sesión
                </button>

                {/* <a href="#!" class="forgot-password-link">
                  Password?
                </a> */}
              </div>
            </form>
            <p class="login-wrapper-footer-text">
              No tenés cuenta?{" "}
              <Link to="/register" class="text-reset">
                Registrate acá
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
