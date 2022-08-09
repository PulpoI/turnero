import Axios from "axios";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../feactures/users/usersSlice";
import { useNavigate } from "react-router-dom";

export const Index = () => {
  const emailField = useRef(null);
  const passwordField = useRef(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.get("http://localhost:5000/users").then((response) => {
      const users = response.data;
      const userToLog = users.find(
        (user) => user.email === emailField.current.value
      );

      console.log(userToLog);
      if (userToLog) {
        if (userToLog.phone === passwordField.current.value) {
          console.log("logged in");
          dispatch(
            setUser({
              email: userToLog.email,
              phone: userToLog.phone,
              token: Date.now(),
            })
          );
          navigate("/home");
        }
      }
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <h2 className="mb-4">LOGIN FORM</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" ref={emailField} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              ref={passwordField}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
