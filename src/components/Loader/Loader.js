import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="container-fluid d-flex justify-content-center loader">
      <div className="lds-ring mt-5 ">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
