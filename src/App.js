import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { NavBar } from "./components/NavBar/NavBar";

import Home from "./pages/Home";
import HomeAdmin from "./pages/Admin/HomeAdmin";
import AllTurns from "./pages/Admin/AllTurns";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Turns from "./pages/Turns";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const admin = useSelector((state) => state.admin.isAdmin);

  const RequireAuth = ({ children }) => {
    if (
      !localStorage.getItem("token") ||
      !localStorage.getItem("phone") ||
      !localStorage.getItem("fullName" || !localStorage.getItem("email"))
    ) {
      return <Navigate to="/login" replace={true} />;
    }
    return children;
  };

  const RequireAdmin = ({ children }) => {
    if (!admin) {
      return <Navigate to="/" replace={true} />;
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

        <Route
          path="/all-turns"
          element={
            <RequireAdmin>
              {" "}
              <AllTurns />{" "}
            </RequireAdmin>
          }
        />

        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
