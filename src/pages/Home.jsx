import { Link } from "react-router-dom";

import logo from "../assets/logoLarge.png";
const Home = () => {
  return (
    <div>
      <div className="container-home ">
        <Link to="/turnero">
          <button
            type="button"
            className="btn btn btn-outline-light px-5 py-3 btn-lg"
          >
            Turnero
          </button>
        </Link>
        <img src={logo} alt="logo" className="img-logoLarge img-fluid" />
        <Link to="/mis-turnos">
          <button
            type="button"
            className="btn btn-outline-light px-5 py-3 btn-lg"
          >
            Mis turnos
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
