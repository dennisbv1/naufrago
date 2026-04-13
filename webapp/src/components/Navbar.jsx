import React from "react";


export default function Navbar({ currentTab, setCurrentTab }) {
  const tabs = [
    { id: "ruleta", label: "Ruleta", icon: "/assets/ruleta.png" },
    { id: "mercado", label: "Mercado", icon: "/assets/mercado.png" },
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
