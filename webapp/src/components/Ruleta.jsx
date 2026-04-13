import React, { useState } from "react";
import ruletaImg from "../assets/ruleta.png"; 
import ruletaBg from "../assets/ruleta-bg.png";


export default function Ruleta({ onClose }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    "Queso", "Jamón", "Papas", "Gaseosa",
    "Huevo", "Tocino", "Imán", "Nada",
    "Hotdog", "Pierdes", "Carne x2", "Taco"
  ];

  const spinWheel = () => {
    if (spinning) return;

    setSelectedOption(null);
    setSpinning(true);

    const randomTurns = 360 * (5 + Math.random() * 3);
    const finalRotation = rotation + randomTurns;

    setRotation(finalRotation);

    setTimeout(() => {
      const degrees = finalRotation % 360;
      const slice = 360 / options.length;
      const index = Math.floor((360 - degrees) / slice) % options.length;

      setSelectedOption(options[index]);
      setSpinning(false);
    }, 4000);
  };

  return (
    <div className="ruleta-screen">
      <img src={ruletaBg} className="ruleta-bg" />

      <button className="close-btn" onClick={onClose}>✕</button>

      <div className="arrow"></div>

      <div className="ruleta-wrapper">
        <img
          src={ruletaImg}
          className={`ruleta ${spinning ? "spinning" : ""}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        />

        <button className="spin-btn" onClick={spinWheel}>
          Girar
        </button>
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
