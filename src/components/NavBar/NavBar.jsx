import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { unsetUser } from "../../feactures/users/usersSlice";

import logo from "../../assets/logo.png";
import { unsetAdmin } from "../../feactures/admin/adminSlice";

export const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin.isAdmin);

  // Logout and remove local storage
  const handleLogout = () => {
    dispatch(unsetUser());
    dispatch(unsetAdmin());
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    localStorage.removeItem("isAdmin");

    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-1">
      <div className="container-fluid ">
        <Link to="/">
          <span className="navbar-brand">
            <img src={logo} alt="logo" width="80" />
          </span>
        </Link>
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-end">
            <li className="nav-item">
              <Link to="/turnero" className="nav-link ">
                {/* <a className="nav-link active" aria-current="page" href="#"> */}
                Turnero
                {/* </a> */}
              </Link>
            </li>
            {}
            <li className="nav-item">
              <Link to="/mis-turnos" className="nav-link ">
                Mis turnos
              </Link>
            </li>
            {admin && (
              <li className="nav-item">
                <Link to="/todos-los-turnos" className="nav-link">
                  Todos los turnos
                </Link>
              </li>
            )}
          </ul>
          <form className="d-flex justify-content-end" role="search">
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Cerrar sesíon
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
