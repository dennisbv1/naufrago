import React, { useState } from "react";
import CastawaySceneAnimated from "./CastawaySceneAnimated";

export default function App() {
  const [forcedHour, setForcedHour] = useState(null);

  return (
    <div className="app-container">
      <div className="webapp-frame" style={{ position: "relative" }}>
        <div className="controls">
          <button className="btn" onClick={() => setForcedHour(null)}>Hora real</button>
          <button className="btn" onClick={() => setForcedHour(8)}>Amanecer</button>
          <button className="btn" onClick={() => setForcedHour(13)}>Mediodía</button>
          <button className="btn" onClick={() => setForcedHour(18)}>Atardecer</button>
          <button className="btn" onClick={() => setForcedHour(23)}>Noche</button>
        </div>

        <CastawaySceneAnimated width={360} height={760} timeOverride={forcedHour} />
      </div>
    </div>
  );
}
