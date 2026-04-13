import React from "react";
import mercadoImg from "../assets/market.jpg"; // tu imagen del mercado


export default function Mercado({ onClose }) {
  return (
    <div className="mercado-screen">
      <div className="mercado-window">
        <button className="mercado-close" onClick={onClose}>✕</button>

        <img src={mercadoImg} alt="Mercado" className="mercado-bg" />

        <div className="mercado-content">
          <h2>Ofertas del Mercado</h2>

          <div className="mercado-scroll">
            <p>Pez común - 10 monedas</p>
            <p>Pez raro - 25 monedas</p>
            <p>Pez épico - 50 monedas</p>
            <p>Pez legendario - 100 monedas</p>
            <p>Carne x2 - 30 monedas</p>
            <p>Hotdog - 15 monedas</p>
            <p>Sanduche - 20 monedas</p>
          </div>
        </div>
      </div>
    </div>
  );
}
