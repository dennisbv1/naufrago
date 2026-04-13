import React, { useState } from "react";
import ruletaImg from "../assets/ruleta.png";
import ruletaBg from "../assets/ruleta_bg.png"; // fondo distinto para la ruleta

export default function Ruleta() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    const randomRotation = 360 * (3 + Math.random() * 3);
    const finalRotation = rotation + randomRotation;
    setRotation(finalRotation);
    setTimeout(() => setSpinning(false), 4000);
  };

  return (
    <div className="ruleta-screen">
      <img src={ruletaBg} alt="Fondo ruleta" className="ruleta-bg" />
      <div className="ruleta-container">
        <img
          src={ruletaImg}
          alt="Ruleta tropical"
          className={`ruleta ${spinning ? "spinning" : ""}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        />
        <button className="spin-btn" onClick={spinWheel}>Girar</button>
      </div>
    </div>
  );
}
