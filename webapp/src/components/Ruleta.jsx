import React, { useState } from "react";
import ruletaImg from "../assets/ruleta.png"; // la imagen que subiste
import ruletaBg from "../assets/ruleta-bg.png"; // fondo tropical
import "./styles.css";

export default function Ruleta({ onClose }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    "Queso", "Jamón", "Papas", "Gaseosa",
    "Huevo", "Tocino", "Imán", "Nada",
    "Hotdog", "Pierdes", "Carne x2", "Taco"
  ];

  const spinWheel = () => {
    const index = Math.floor(Math.random() * options.length);
    setSelectedOption(options[index]);
  };

  return (
    <div className="ruleta-screen">
      <img src={ruletaBg} alt="Fondo ruleta" className="ruleta-bg" />
      <button className="close-btn" onClick={onClose}>✕</button>

      <div className="ruleta-container">
        {/* Flecha arriba */}
        <div className="arrow"></div>

        {/* Imagen de la ruleta */}
        <div className="ruleta-wrapper">
          <img src={ruletaImg} alt="Ruleta" className="ruleta" />
          <button className="spin-btn" onClick={spinWheel}>Girar</button>
        </div>
      </div>

      {selectedOption && (
        <div className="result-box">
          <p>{selectedOption}</p>
          <button className="claim-btn">Reclamar</button>
        </div>
      )}
    </div>
  );
}
