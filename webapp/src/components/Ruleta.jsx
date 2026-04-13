import React, { useState } from "react";
import ruletaImg from "../assets/ruleta.png";
import ruletaBg from "../assets/ruleta-bg.png";

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
      <img src={ruletaBg} className="ruleta-bg" />
      <div className="ruleta-container">
        <img
          src={ruletaImg}
          className="ruleta"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
        <button className="spin-btn" onClick={spinWheel}>Girar</button>
      </div>
    </div>
  );
}
