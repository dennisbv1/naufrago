import React from "react";
import naufragoImg from "../assets/naufrago.png";

export default function Scene() {
  return (
    <div className="scene">
      <img src={naufragoImg} alt="Escena del náufrago" className="scene-bg" />
    </div>
  );
}
