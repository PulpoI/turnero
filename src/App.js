import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import Home from "./pages/Home";
import HomeAdmin from "./pages/Admin/HomeAdmin";
import AllTurns from "./pages/Admin/AllTurns";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Turns from "./pages/Turns";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./feactures/users/usersSlice";
import { setAdmin } from "./feactures/admin/adminSlice";
import EditTurn from "./pages/Admin/EditTurn";
import Turnero from "./pages/Turnero";
import Footer from "./components/Footer/Footer";

function App() {
  const admin = useSelector((state) => state.admin.isAdmin);
  const dispatch = useDispatch();

  //set localstorage
  useEffect(() => {
    dispatch(
      setUser({
        email: localStorage.getItem("email"),
        phone: localStorage.getItem("phone"),
        token: localStorage.getItem("token"),
        fullName: localStorage.getItem("fullName"),
      })
    );
    dispatch(setAdmin({ isAdmin: localStorage.getItem("isAdmin") }));
  }, [dispatch]);

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
      {location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/" && <NavBar />}
      {/* {location.pathname !== "/" && <NavBar />} */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />

        <Route
          path="/mis-turnos"
          element={
            <RequireAuth>
              <Turns />
            </RequireAuth>
          }
        />
        <Route
          path="editar-turno/:id"
          element={
            <RequireAuth>
              <EditTurn />
            </RequireAuth>
          }
        />
        <Route
          path="/turnero"
          element={
            admin ? (
              <RequireAdmin>
                <HomeAdmin />
              </RequireAdmin>
            ) : (
              <RequireAuth>
                <Turnero />
              </RequireAuth>
            )
          }
        />

        <Route
          path="/todos-los-turnos"
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
      {location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/" && <Footer />}
    </>
  );
}

export default App;
