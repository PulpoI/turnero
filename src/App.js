import { Routes, Route } from "react-router-dom";

import { NavBar } from "./components/NavBar/NavBar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Turns from "./pages/Turns";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/home" element={<Home />} />

        <Route path="/" element={<Login />} />
        <Route path="/turns" element={<Turns />} />
      </Routes>
    </>
  );
}

export default App;
