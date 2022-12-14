import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, addDoc } from "@firebase/firestore";
import { db } from "../firebase/firebase";
import { SetLoginStorage } from "../hooks/SetLoginStorage";
import { setUser } from "../feactures/users/usersSlice";
import { useDispatch } from "react-redux";
import LeftAuth from "../components/LeftAuth/LeftAuth";

const Register = () => {
  const userCollection = collection(db, "users");

  const emailField = useRef(null);
  const passwordField = useRef(null);
  const fullNameField = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dispatch(
        setUser({
          email: emailField.current.value,
          phone: passwordField.current.value,
          token: new Date(),
          fullName: fullNameField.current.value,
        })
      );
      SetLoginStorage({
        email: emailField.current.value,
        phone: passwordField.current.value,
        token: new Date(),
        fullName: fullNameField.current.value,
      });

      navigate("/turnero", { replace: true });
    }
  };

  return (
    <div class="container-fluid ">
      <div class="row">
        <LeftAuth auth="Inicia sesión" pathAuth={"/login"} />
        <div class="col-sm-6 col-md-5 form-section">
          <div class="login-wrapper">
            <h2 class="login-title">Registrate</h2>
            <form onSubmit={handleSubmit}>
              <div class="form-group">
                <label class="sr-only">Email / Usuario</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="user@user.com"
                  ref={emailField}
                />
              </div>
              <div class="form-group mb-3">
                <label class="sr-only">Teléfono</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="011 1234567"
                  ref={passwordField}
                />
              </div>
              <div class="form-group mb-3">
                <label class="sr-only">Nombre y apellido</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Juan Perez"
                  ref={fullNameField}
                />
              </div>

              <div class="d-flex justify-content-between align-items-center mb-5">
                <button class="btn btn-dark" type="submit">
                  {" "}
                  Registrate
                </button>

                {/* <a href="#!" class="forgot-password-link">
            Password?
          </a> */}
              </div>
            </form>
            <p class="login-wrapper-footer-text">
              Tenés cuenta?{" "}
              <Link to="/login" class="text-reset">
                Iniciá sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
