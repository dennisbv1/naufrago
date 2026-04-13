import React from "react";
import ruletaIcon from "../assets/ruleta.png";
import mercadoIcon from "../assets/mercado.png";

export default function Navbar({ currentTab, setCurrentTab }) {
  const tabs = [
    { id: "ruleta", label: "Ruleta", icon: ruletaIcon },
    { id: "mercado", label: "Mercado", icon: mercadoIcon },
  ];

  return (
    <div className="navbar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-btn ${currentTab === tab.id ? "active" : ""}`}
          onClick={() => setCurrentTab(tab.id)}
        >
          <img src={tab.icon} alt={tab.label} className="nav-icon" />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
