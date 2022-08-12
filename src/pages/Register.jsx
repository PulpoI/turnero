import Axios from "axios";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../feactures/users/usersSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailField = useRef(null);
  const passwordField = useRef(null);
  const fullNameField = useRef(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.get("http://localhost:5000/users").then((response) => {
      const data = response.data;
      const user = data.find((user) => {
        return user.email === emailField.current.value;
      });
      if (user) {
        alert("Usuario ya existe, elija otro email o usuario");
      } else {
        localStorage.setItem("email", emailField.current.value);
        localStorage.setItem("phone", passwordField.current.value);
        localStorage.setItem("fullName", fullNameField.current.value);
        localStorage.setItem("token", Date.now());
        Axios.post("http://localhost:5000/users", {
          email: emailField.current.value,
          phone: passwordField.current.value,
          fullName: fullNameField.current.value,
          id: Date.now(),
        })
          .then((response) => {
            const data = response.data;
            dispatch(
              setUser({
                email: data.email,
                phone: data.phone,
                fullName: data.fullName,
                token: Date.now(),
              })
            );
            navigate("/home", { replace: true });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });

    // Axios.post("http://localhost:5000/users", {
    //   email: emailField.current.value,
    //   phone: passwordField.current.value,
    //   fullName: fullNameField.current.value,
    //   id: new Date().getTime(),
    // }).then((response) => {
    //   const data = response.data;
    //   dispatch(
    //     setUser({
    //       email: emailField.current.value,
    //       phone: passwordField.current.value,
    //       token: fullNameField.current.value,
    //     })
    //   );
    //   navigate("/home");
    // });
  };

  return (
    <div className="row justify-content-center">
      <div className="">
        <h2 className="mb-4">REGISTER</h2>
        <form className="mx-5" onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <label className="form-label">Email o Usuario</label>
            <input type="email" className="form-control" ref={emailField} />
          </div>
          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              type="password"
              className="form-control"
              ref={passwordField}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nombre y apellido</label>
            <input type="text" className="form-control" ref={fullNameField} />
          </div>
          <button type="submit" className="btn btn-primary">
            Registrarme
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
