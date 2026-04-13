import React from "react";


export default function Mercado() {
  return (
    <div className="mercado-container">
      <img src="./assets/mercado.png" alt="Ventana del mercado" className="mercado-bg" />
      <div className="mercado-content">
        <h2>Ofertas del mercado</h2>
        <div className="mercado-scroll">
          {/* Aquí irán las ofertas dinámicas */}
          <p>Oferta 1: Pez raro</p>
          <p>Oferta 2: Pez legendario</p>
          <p>Oferta 3: Pez común</p>
        </div>
      </div>
    </div>
  );
}
