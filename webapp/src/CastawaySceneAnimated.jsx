// CastawaySceneAnimated.jsx
import React, { useEffect, useRef, useState } from "react";

export default function CastawaySceneAnimated({ width = 360, height = 760, timeOverride = null }) {
  const [hour, setHour] = useState(timeOverride ?? new Date().getHours());
  const cloudRef = useRef(null);
  const waterRef = useRef(null);
  const leafRefs = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    if (timeOverride !== null) return;
    const tick = () => setHour(new Date().getHours());
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [timeOverride]);

  useEffect(() => {
    let last = performance.now();
    const loop = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      // nubes: deriva lenta
      if (cloudRef.current) {
        const x = Math.sin(now / 5000) * (width * 0.03);
        cloudRef.current.style.transform = `translateX(${x}px)`;
      }
      // agua: desplazamiento continuo
      if (waterRef.current) {
        const offset = (now / 1000) * 18;
        waterRef.current.style.transform = `translateX(${(offset % 240) - 120}px)`;
      }
      // hojas: oscilación con fases distintas
      leafRefs.current.forEach((el, i) => {
        if (!el) return;
        const phase = Math.sin(now / (2200 + i * 300)) * (4 + i * 1.5);
        el.style.transform = `rotate(${phase}deg)`;
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [width]);

  const getSkyColors = (h) => {
    if (h >= 6 && h < 10) {
      return { top: "#FFD8B5", mid: "#FFB07A", bottom: "#7FB3FF", sun: "#FFD27D", ambient: 0.9 };
    }
    if (h >= 10 && h < 17) {
      return { top: "#9FD7FF", mid: "#66C3FF", bottom: "#1E90FF", sun: "#FFF7C2", ambient: 1 };
    }
    if (h >= 17 && h < 20) {
      return { top: "#FFB07A", mid: "#FF7A9A", bottom: "#6A82FB", sun: "#FFB86B", ambient: 0.85 };
    }
    return { top: "#081028", mid: "#12213a", bottom: "#243b66", sun: "#FFD27D", ambient: 0.45 };
  };

  const colors = getSkyColors(hour);
  const viewBox = `0 0 ${width} ${height}`;

  // helpers for responsive sizes
  const W = width;
  const H = height;

  return (
    <svg viewBox={viewBox} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={colors.top} />
          <stop offset="55%" stopColor={colors.mid} />
          <stop offset="100%" stopColor={colors.bottom} />
        </linearGradient>

        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors.sun} stopOpacity="1" />
          <stop offset="100%" stopColor={colors.sun} stopOpacity="0" />
        </radialGradient>

        <linearGradient id="seaGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#4FC3F7" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#026aa7" stopOpacity="0.95" />
        </linearGradient>

        <pattern id="wavePattern" patternUnits="userSpaceOnUse" width="240" height="40">
          <path d="M0 20 q40 -12 80 0 t80 0 v20 h-240 z" fill="#66c2ff" opacity="0.16" />
        </pattern>

        <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity="0.25" />
        </filter>

        <filter id="softInner" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <style>
          {`
            .drone-rotor { transform-origin: center; animation: spin 0.9s linear infinite; }
            .drone-hover { animation: hover 2.6s ease-in-out infinite; }
            .cloud { fill: #fff; opacity: 0.95; filter: drop-shadow(0 6px 10px rgba(0,0,0,0.08)); }
            .water-surface { will-change: transform; }
            .palm-leaf { transform-origin: 0 12px; will-change: transform; }
            .beard { filter: url(#softInner); }
            @keyframes spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
            @keyframes hover { 0% { transform: translateY(0);} 50% { transform: translateY(-6px);} 100% { transform: translateY(0);} }
          `}
        </style>
      </defs>

      {/* Sky and sun */}
      <rect x="0" y="0" width={W} height={H} fill="url(#skyGrad)" />
      <g transform={`translate(${W * 0.78}, ${H * 0.18})`}>
        <circle cx="0" cy="0" r={W * 0.12} fill={colors.sun} opacity={colors.ambient} />
        <circle cx="0" cy="0" r={W * 0.26} fill="url(#sunGlow)" />
      </g>

      {/* Distant birds */}
      <g transform={`translate(${W * 0.12}, ${H * 0.12})`} opacity="0.9">
        <path d="M0 0 q8 -6 16 0" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>

      {/* Clouds group */}
      <g ref={cloudRef} transform={`translate(${W * 0.02}, ${H * 0.10})`}>
        <g className="cloud" transform={`translate(${W * 0.05}, ${H * 0.02}) scale(1.05)`}>
          <ellipse cx="40" cy="20" rx="36" ry="18" />
          <ellipse cx="18" cy="22" rx="22" ry="14" />
          <ellipse cx="62" cy="22" rx="22" ry="14" />
        </g>
        <g className="cloud" transform={`translate(${W * 0.50}, ${H * 0.03}) scale(0.9)`}>
          <ellipse cx="40" cy="20" rx="36" ry="18" />
          <ellipse cx="18" cy="22" rx="22" ry="14" />
          <ellipse cx="62" cy="22" rx="22" ry="14" />
        </g>
      </g>

      {/* Sea with subtle reflection */}
      <g transform={`translate(0, ${H * 0.55})`}>
        <rect x="0" y="0" width={W} height={H * 0.45} fill="url(#seaGrad)" />
        <g ref={waterRef} className="water-surface">
          <rect x={-120} y={0} width={W + 240} height={H * 0.18} fill="url(#wavePattern)" />
        </g>
        {/* reflection of sun */}
        <g transform={`translate(${W * 0.78}, ${H * 0.06})`} opacity="0.18">
          <ellipse cx="0" cy="0" rx={W * 0.18} ry={H * 0.02} fill={colors.sun} />
        </g>
      </g>

      {/* Island base */}
      <g transform={`translate(${W * 0.5}, ${H * 0.62})`}>
        <path d={`
          M ${-W * 0.28} 0
          q ${-W * 0.05} ${H * 0.06} ${-W * 0.02} ${H * 0.09}
          q ${W * 0.12} ${H * 0.08} ${W * 0.3} ${H * 0.08}
          q ${W * 0.18} 0 ${W * 0.28} ${-H * 0.06}
          q ${-W * 0.02} ${-H * 0.12} ${-W * 0.84} ${-H * 0.11}
          Z
        `} fill="#F4D29A" stroke="#E0B97A" strokeWidth="2" filter="url(#softShadow)" />
        {/* starfish */}
        <g transform={`translate(${-W * 0.12}, ${H * 0.03}) scale(0.95)`}>
          <path d="M0 -8 l3 6 6 1 -5 4 1 6 -5 -3 -5 3 1 -6 -5 -4 6 -1z" fill="#FF7A5A" stroke="#E85A3F" strokeWidth="1" />
        </g>
        {/* shell */}
        <g transform={`translate(${W * 0.18}, ${H * 0.04}) scale(0.95)`}>
          <path d="M0 6 q6 -8 12 0 q-6 2 -12 0z" fill="#F8CFC0" stroke="#E6AFA0" strokeWidth="1" />
        </g>
      </g>

      {/* Palm tree trunk and leaves */}
      <g transform={`translate(${W * 0.62}, ${H * 0.45})`}>
        <path d={`M-8 0 q8 -6 16 0 v${H * 0.18} q-8 6 -16 0z`} fill="#7a4a28" stroke="#5b351d" strokeWidth="1.5" />
        <g transform={`translate(0, ${-H * 0.02})`}>
          <path ref={el => (leafRefs.current[0] = el)} className="palm-leaf" d="M0 0 q40 -30 80 -10 q-30 -20 -80 10z" fill="#2E8B57" />
          <path ref={el => (leafRefs.current[1] = el)} className="palm-leaf" d="M0 0 q-40 -30 -80 -10 q30 -20 80 10z" fill="#2E8B57" />
          <path ref={el => (leafRefs.current[2] = el)} className="palm-leaf" d="M0 0 q50 -20 100 10 q-40 -30 -100 -10z" fill="#2E8B57" />
        </g>
      </g>

      {/* Castaway figure with beard and leaf clothing */}
      <g transform={`translate(${W * 0.42}, ${H * 0.56}) scale(1)`}>
        {/* torso shadow */}
        <ellipse cx="0" cy="20" rx="16" ry="12" fill="#B36A3F" opacity="0.9" />
        {/* head */}
        <circle cx="0" cy="0" r="12" fill="#F0C8A0" stroke="#CFA07A" strokeWidth="1" />
        {/* beard full shape */}
        <path className="beard" d="M-10 6 q10 26 20 0 q-6 6 -14 6z" fill="#5A3420" />
        {/* eyes small */}
        <circle cx="-4" cy="-2" r="1.2" fill="#2b2b2b" />
        <circle cx="4" cy="-2" r="1.2" fill="#2b2b2b" />
        {/* leaves clothing */}
        <path d="M-12 18 q12 10 24 0 q-8 8 -16 8z" fill="#3f9b4a" />
        {/* fishing rod */}
        <path d="M-6 -6 q-28 -18 -56 -36" stroke="#6B4A2A" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="-6" cy="-6" r="2" fill="#000" />
      </g>

      {/* Drone above palm with rotors */}
      <g className="drone-hover" transform={`translate(${W * 0.62}, ${H * 0.28})`}>
        <rect x={-26} y={-10} width={52} height={20} rx="5" fill="#222" stroke="#111" strokeWidth="1" />
        <g transform="translate(-20, -14)">
          <circle cx="0" cy="0" r="7" fill="#444" />
          <rect className="drone-rotor" x="-14" y="-1.5" width="28" height="3" fill="#bdbdbd" />
        </g>
        <g transform="translate(20, -14)">
          <circle cx="0" cy="0" r="7" fill="#444" />
          <rect className="drone-rotor" x="-14" y="-1.5" width="28" height="3" fill="#bdbdbd" />
        </g>
        <rect x={-8} y={-6} width={16} height={10} rx="2" fill="#111" />
        <circle cx="0" cy="0" r="2.5" fill="#66CCFF" />
      </g>

      {/* Fishing line from rod to drone */}
      <path
        d={`M ${W * 0.42 - 6} ${H * 0.56 - 6} Q ${W * 0.52} ${H * 0.45} ${W * 0.62} ${H * 0.28 + 6}`}
        stroke="#333"
        strokeWidth="1.4"
        strokeDasharray="3 2"
        fill="none"
      />

      {/* subtle mobile safe frame */}
      <rect x="6" y="6" width={W - 12} height={H - 12} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="2" rx="10" />
    </svg>
  );
}
