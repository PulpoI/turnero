import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";

import { NavBar } from "./components/NavBar/NavBar";

import Home from "./pages/Home";
import HomeAdmin from "./pages/Admin/HomeAdmin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Turns from "./pages/Turns";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./feactures/users/usersSlice";

function App() {
  const admin = useSelector((state) => state.admin.isAdmin);
  const user = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const RequireAuth = ({ children }) => {
    if (!localStorage.getItem("token")) {
      return <Navigate to="/login" replace={true} />;
    }
    return children;
  };
  const location = useLocation();
  return (
    <>
      <NavBar />
      <Routes location={location} key={location.pathname}>
        <Route
          exact
          path="/"
          element={
            admin ? (
              <RequireAuth>
                {" "}
                <HomeAdmin />{" "}
              </RequireAuth>
            ) : (
              <RequireAuth>
                <Home />
              </RequireAuth>
            )
          }
        />
        <Route
          path="/turns"
          element={
            <RequireAuth>
              <Turns />
            </RequireAuth>
          }
        />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
