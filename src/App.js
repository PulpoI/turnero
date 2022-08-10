import { Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route exact path="/home" element={<Home />} />

      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
