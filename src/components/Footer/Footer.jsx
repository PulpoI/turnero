import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logoLarge.png";
import { admin } from "../../utils/Data";

const Footer = () => {
  return (
    <div className="footer bg-dark fixed">
      <footer className="d-flex flex-wrap justify-content-between align-items-center  py-3  border-top">
        <p className="col-md-3 mb-0 text-muted">© 2022 Company, Inc</p>

        <Link
          to="/"
          className="col-md-6 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <img className="img-fluid" width="500" src={logo} alt="logo"></img>
        </Link>

        <ul className="nav col-md-3 justify-content-end">
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              Turnero
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              Mis turnos
            </a>
          </li>
          {admin && (
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-muted">
                Todos los turnos
              </a>
            </li>
          )}
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
