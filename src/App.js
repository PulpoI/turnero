import { Routes, Route } from "react-router-dom";

import { NavBar } from "./components/NavBar/NavBar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Turns from "./pages/Turns";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/register" element={<Register />} />

        <Route path="/" element={<Login />} />
        <Route path="/turns" element={<Turns />} />
      </Routes>
    </>
  );
}

export default App;
