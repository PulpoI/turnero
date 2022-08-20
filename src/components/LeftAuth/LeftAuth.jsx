import React from "react";
import { Link } from "react-router-dom";
import "../../pages/Login.css";
import logo from "../../assets/logo.png";

const LeftAuth = ({ auth, pathAuth }) => {
  return (
    <div className="col-sm-6 col-md-7 d-flex align-items-center intro-section bg-dark">
      <div className="brand-wrapper">
        <h1>
          <Link to="/">
            <img src={logo} alt="logo" width={200} />
          </Link>
        </h1>
      </div>
      <div className="intro-content-wrapper">
        <h1 className="intro-title">Bienvenido/a al Turnero</h1>
        <p className="intro-text">
          Saca tu turno y disfruta de una experiencia de servicio más segura y
          eficaz.
        </p>
        <Link to={pathAuth}>
          <button type="button" className="btn btn-light">
            {auth}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LeftAuth;
