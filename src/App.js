import { Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Turns from "./pages/Turns";

function App() {
  return (
    <Routes>
      <Route exact path="/home" element={<Home />} />

      <Route path="/" element={<Login />} />
      <Route path="/turns" element={<Turns />} />
    </Routes>
  );
}

export default App;
