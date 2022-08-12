import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { unsetUser } from "../../feactures/users/usersSlice";

import logo from "../../assets/logo.png";

export const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout and remove local storage
  const handleLogout = () => {
    dispatch(unsetUser());
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    localStorage.removeItem("isAdmin");
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="logo" width="100" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                {/* <a className="nav-link active" aria-current="page" href="#"> */}
                Turnero
                {/* </a> */}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/turns">
                <span className="nav-link" href="#">
                  Mis turnos
                </span>
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <p></p>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Cerrar sesíon
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
