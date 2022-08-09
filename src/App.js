import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import "./App.css";

import Turn from "./components/Turn";
import Home from "./pages/Home";

const Login = lazy(() => import("./components/Views/auth/Login/Login"));
const Register = lazy(() =>
  import("./components/Views/auth/Register/Register")
);

const RequireAuth = ({ children }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

const pageTransition = {
  in: { opacity: 1 },
  out: { opacity: 0 },
};

function App() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            // <RequireAuth>
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <Turn />
              </Suspense>
            </motion.div>
            // </RequireAuth>
          }
        />
        <Route
          path="/home"
          element={
            // <RequireAuth>
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            </motion.div>
            // </RequireAuth>
          }
        />
        <Route
          exact
          path="/login"
          element={
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            </motion.div>
          }
        />
        <Route
          exact
          path="/register"
          element={
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <Register />
              </Suspense>
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
