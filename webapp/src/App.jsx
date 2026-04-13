import React, { useState } from "react";
import Scene from "./components/Scene";
import Navbar from "./components/Navbar";
import Ruleta from "./components/Ruleta";
import Mercado from "./components/Mercado";
import "./styles.css"; // estilos globales

export default function App() {
  const [currentTab, setCurrentTab] = useState("ruleta");

  return (
    <div className="app">
      {currentTab === "ruleta" ? <Ruleta /> : <Scene />}
      {currentTab === "mercado" && <Mercado />}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </div>
  );
}
