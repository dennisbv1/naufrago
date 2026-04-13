import React, { useState } from "react";
import Scene from "./components/Scene";
import Navbar from "./components/Navbar";
import Ruleta from "./components/Ruleta";
import Mercado from "./components/Mercado";
import "./styles.css";

export default function App() {
  const [currentTab, setCurrentTab] = useState("ruleta");

  return (
    <div className="app">
      <Scene />
      {currentTab === "ruleta" && <Ruleta />}
      {currentTab === "mercado" && <Mercado />}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </div>
  );
}
