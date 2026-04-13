import React, { useEffect, useRef, useState } from "react";

/**
 * CastawaySceneAnimated
 * Props:
 *  - width, height: tamaño del viewBox
 *  - timeOverride: número 0-23 para forzar hora (opcional)
 */
export default function CastawaySceneAnimated({ width = 360, height = 760, timeOverride = null }) {
  const [hour, setHour] = useState(timeOverride ?? new Date().getHours());
  const cloudRef = useRef(null);
  const waterRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (timeOverride !== null) {
      setHour(timeOverride);
    }
  }, [timeOverride]);

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
      if (waterRef.current) {
        const offset = (now / 1000) * 12;
        waterRef.current.style.transform = `translateX(${(offset % 160) - 80}px)`;
      }
      if (cloudRef.current) {
        const sway = Math.sin(now / 2000) * 18;
        cloudRef.current.style.transform = `translateX(${sway}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const getSkyColors = (h) => {
    if (h >= 6 && h < 10) {
      return { top: "#FFD7A6", mid: "#FF9A8B", bottom: "#6A82FB", sun: "#FFD27D" };
    }
    if (h >= 10 && h < 17) {
      return { top: "#87CEEB", mid: "#4FC3F7", bottom: "#0288D1", sun: "#FFF59D" };
    }
    if (h >= 17 && h < 20) {
      return { top: "#FF9A8B", mid: "#FF6A88", bottom: "#6A82FB", sun: "#FFB86B" };
    }
    return { top: "#0f1724", mid: "#1f2a44", bottom: "#2b3b6a", sun: "#FFD27D" };
  };

  const colors = getSkyColors(hour);
  const viewBox = `0 0 ${width} ${height}`;

  return (
    <svg viewBox={viewBox} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={colors.top} />
          <stop offset="50%" stopColor={colors.mid} />
          <stop offset="100%" stopColor={colors.bottom} />
        </linearGradient>

        <linearGradient id="seaGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#4FC3F7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0288D1" stopOpacity="0.95" />
        </linearGradient>

        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors.sun} stopOpacity="1" />
          <stop offset="100%" stopColor={colors.sun} stopOpacity="0" />
        </radialGradient>

        <pattern id="wavePattern" patternUnits="userSpaceOnUse" width="160" height="40">
          <path d="M0 20 q40 -12 80 0 t80 0 v20 h-160 z" fill="#66c2ff" opacity="0.18" />
        </pattern>

        <style>
          {`
            .cloud { fill: #fff; filter: drop-shadow(0 6px 8px rgba(0,0,0,0.06)); }
            .cloudGroup { transition: transform 0.6s linear; }
            .drone-rotor { transform-origin: center; animation: spin 0.9s linear infinite; }
            .drone-hover { animation: hover 2.5s ease-in-out infinite; }
            .palm-leaf { transform-origin: 0 10px; animation: leafSway 3s ease-in-out infinite; }
            .palm-leaf:nth-child(2) { animation-duration: 3.6s; }
            .palm-leaf:nth-child(3) { animation-duration: 2.8s; }
            .water-surface { animation: wave 6s linear infinite; }
            @keyframes spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
            @keyframes hover { 0% { transform: translateY(0);} 50% { transform: translateY(-8px);} 100% { transform: translateY(0);} }
            @keyframes leafSway {
              0% { transform: rotate(-6deg); }
              50% { transform: rotate(6deg); }
              100% { transform: rotate(-6deg); }
            }
            @keyframes wave {
              0% { transform: translateX(0); }
              100% { transform: translateX(-80px); }
            }
          `}
        </style>
      </defs>

      <rect x="0" y="0" width={width} height={height} fill="url(#skyGrad)" />
      <g transform={`translate(${width * 0.78}, ${height * 0.18})`}>
        <circle cx="0" cy="0" r={width * 0.11} fill={colors.sun} opacity={hour >= 20 || hour < 5 ? 0.6 : 1} />
        <circle cx="0" cy="0" r={width * 0.22} fill="url(#sunGlow)" />
      </g>

      <g ref={cloudRef} className="cloudGroup" transform={`translate(${width * 0.02}, ${height * 0.12})`}>
        <g className="cloud" transform={`translate(${width * 0.05}, ${height * 0.02}) scale(1.1)`}>
          <ellipse cx="40" cy="20" rx="36" ry="18" />
          <ellipse cx="18" cy="22" rx="22" ry="14" />
          <ellipse cx="62" cy="22" rx="22" ry="14" />
        </g>
        <g className="cloud" transform={`translate(${width * 0.45}, ${height * 0.04}) scale(0.9)`}>
          <ellipse cx="40" cy="20" rx="36" ry="18" />
          <ellipse cx="18" cy="22" rx="22" ry="14" />
          <ellipse cx="62" cy="22" rx="22" ry="14" />
        </g>
      </g>

      <g transform={`translate(${width * 0.12}, ${height * 0.14})`} opacity="0.9">
        <path d="M0 0 q8 -6 16 0" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>

      <g transform={`translate(0, ${height * 0.55})`}>
        <rect x="0" y="0" width={width} height={height * 0.45} fill="url(#seaGrad)" />
        <g ref={waterRef} style={{ willChange: "transform" }}>
          <rect x="-80" y="0" width={width + 160} height={height * 0.18} fill="url(#wavePattern)" className="water-surface" />
        </g>
      </g>

      <g transform={`translate(${width * 0.5}, ${height * 0.62})`}>
        <path d={`
          M ${-width * 0.28} 0
          q ${-width * 0.05} ${height * 0.06} ${-width * 0.02} ${height * 0.09}
          q ${width * 0.12} ${height * 0.08} ${width * 0.3} ${height * 0.08}
          q ${width * 0.18} 0 ${width * 0.28} ${-height * 0.06}
          q ${-width * 0.02} ${-height * 0.12} ${-width * 0.84} ${-height * 0.11}
          Z
        `} fill="#F4D29A" stroke="#E0B97A" strokeWidth="2" />
      </g>

      <g transform={`translate(${width * 0.62}, ${height * 0.45})`}>
        <rect x="-6" y="0" width="12" height={height * 0.18} rx="6" fill="#8B5A2B" />
        <g transform={`translate(0, ${-height * 0.02})`}>
          <path className="palm-leaf" d="M0 0 q40 -30 80 -10 q-30 -20 -80 10z" fill="#2E8B57" />
          <path className="palm-leaf" d="M0 0 q-40 -30 -80 -10 q30 -20 80 10z" fill="#2E8B57" />
          <path className="palm-leaf" d="M0 0 q50 -20 100 10 q-40 -30 -100 -10z" fill="#2E8B57" />
        </g>
      </g>

      <g transform={`translate(${width * 0.42}, ${height * 0.56}) scale(1)`}>
        <ellipse cx="0" cy="18" rx="14" ry="10" fill="#C68642" />
        <circle cx="0" cy="0" r="12" fill="#F0C8A0" stroke="#CFA07A" strokeWidth="1" />
        <path d="M-8 6 q8 18 16 0" fill="#6B3E2A" />
        <path d="M-10 18 q10 8 20 0 q-6 6 -14 6z" fill="#4CAF50" />
        <path d="M-6 -6 q-30 -20 -60 -40" stroke="#6B4A2A" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="-6" cy="-6" r="2" fill="#000" />
      </g>

      <g className="drone-hover" transform={`translate(${width * 0.62}, ${height * 0.28})`}>
        <rect x={-22} y={-8} width={44} height={16} rx="4" fill="#222" />
        <g transform="translate(-18, -10)">
          <circle cx="0" cy="0" r="6" fill="#444" />
          <rect className="drone-rotor" x="-12" y="-1" width="24" height="2" fill="#999" />
        </g>
        <g transform="translate(18, -10)">
          <circle cx="0" cy="0" r="6" fill="#444" />
          <rect className="drone-rotor" x="-12" y="-1" width="24" height="2" fill="#999" />
        </g>
        <rect x={-6} y={-4} width={12} height={8} rx="2" fill="#111" />
        <circle cx="0" cy="0" r="2" fill="#66CCFF" />
      </g>

      <line
        x1={width * 0.42 - 6}
        y1={height * 0.56 - 6}
        x2={width * 0.62}
        y2={height * 0.28 + 6}
        stroke="#333"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
    </svg>
  );
}
