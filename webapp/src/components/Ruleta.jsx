import React, { useEffect, useState } from "react";
import ruletaBg from "../assets/ruleta-bg.png";


export default function Ruleta({ onClose }) {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const options = [
      "Queso", "Jamón", "Papas", "Gaseosa", "-10%", "Huevo", "Tocino", "Imán",
      "-20%", "Papas", "Gaseosa", "Queso", "Nada", "Hotdog", "Pierdes",
      "Carne x2", "Taco", "Sanduche"
    ];

    let startAngle = 0;
    const arc = Math.PI / (options.length / 2);
    let spinTimeout = null;
    let spinAngleStart = 10;
    let spinTime = 0;
    let spinTimeTotal = 0;
    let ctx;

    function byte2Hex(n) {
      const nybHexString = "0123456789ABCDEF";
      return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
    }

    function RGB2Color(r,g,b) {
      return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
    }

    function getColor(item, maxitem) {
      const center = 128;
      const width = 127;
      const frequency = Math.PI*2/maxitem;
      const red   = Math.sin(frequency*item+2) * width + center;
      const green = Math.sin(frequency*item+0) * width + center;
      const blue  = Math.sin(frequency*item+4) * width + center;
      return RGB2Color(red,green,blue);
    }

    function drawRouletteWheel() {
      const canvas = document.getElementById("canvas");
      if (canvas.getContext) {
        const outsideRadius = 200;
        const textRadius = 160;
        const insideRadius = 125;

        ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,500,500);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.font = 'bold 12px Helvetica, Arial';

        for(let i = 0; i < options.length; i++) {
          const angle = startAngle + i * arc;
          ctx.fillStyle = getColor(i, options.length);

          ctx.beginPath();
          ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
          ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
          ctx.stroke();
          ctx.fill();

          ctx.save();
          ctx.fillStyle = "black";
          ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 
                        250 + Math.sin(angle + arc / 2) * textRadius);
          ctx.rotate(angle + arc / 2 + Math.PI / 2);
          const text = options[i];
          ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
          ctx.restore();
        } 

        // Flecha arriba
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(250 - 10, 250 - (outsideRadius + 20));
        ctx.lineTo(250 + 10, 250 - (outsideRadius + 20));
        ctx.lineTo(250, 250 - (outsideRadius - 5));
        ctx.closePath();
        ctx.fill();
      }
    }

    function rotateWheel() {
      spinTime += 30;
      if(spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
      }
      const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
      startAngle += (spinAngle * Math.PI / 180);
      drawRouletteWheel();
      spinTimeout = setTimeout(rotateWheel, 30);
    }

    function stopRotateWheel() {
      clearTimeout(spinTimeout);
      const degrees = startAngle * 180 / Math.PI + 90;
      const arcd = arc * 180 / Math.PI;
      const index = Math.floor((360 - degrees % 360) / arcd);
      const text = options[index];
      setSelectedOption(text);
      drawRouletteWheel();
    }

    function easeOut(t, b, c, d) {
      const ts = (t/=d)*t;
      const tc = ts*t;
      return b+c*(tc + -3*ts + 3*t);
    }

    function spin() {
      setSelectedOption(null);
      spinAngleStart = Math.random() * 10 + 10;
      spinTime = 0;
      spinTimeTotal = (Math.random() * 3 + 4) * 1000;
      rotateWheel();
    }

    document.getElementById("spin").addEventListener("click", spin);
    drawRouletteWheel();
  }, []);

  return (
    <div className="ruleta-screen">
      <img src={ruletaBg} alt="Fondo ruleta" className="ruleta-bg" />
      <button className="close-btn" onClick={onClose}>✕</button>
      <canvas id="canvas" width="500" height="500"></canvas>
      <button id="spin" className="spin-btn">Girar</button>

      {selectedOption && (
        <div className="result-box">
          <p>{selectedOption}</p>
          <button className="claim-btn">Reclamar</button>
        </div>
      )}
    </div>
  );
}
