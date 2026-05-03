import React from "react";
import "./CyberInput.css";

const CyberInput = ({ label, name, type = "text", textarea = false }) => {
  return (
    <div className="glitch-input-wrapper">
      <div className="input-container">

        {textarea ? (
          <textarea
            name={name}
            className="holo-input holo-textarea"
            placeholder=" "
            required
          />
        ) : (
          <input
            type={type}
            name={name}
            className="holo-input"
            placeholder=" "
            required
          />
        )}

        <label className="input-label" data-text={label}>
          {label}
        </label>

        <div className="input-border"></div>
        <div className="input-scanline"></div>
        <div className="input-glow"></div>

        <div className="input-data-stream">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="stream-bar" style={{ "--i": i }}></div>
          ))}
        </div>

        <div className="input-corners">
          <div className="corner corner-tl"></div>
          <div className="corner corner-tr"></div>
          <div className="corner corner-bl"></div>
          <div className="corner corner-br"></div>
        </div>

      </div>
    </div>
  );
};

export default CyberInput;