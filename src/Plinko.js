import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Plinko() {
  const navigate = useNavigate();

  const [options, setOptions] = useState(["Option A", "Option B", "Option C", "Option D"]);
  const [startCol, setStartCol] = useState("");
  const [ballPath, setBallPath] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDropping, setIsDropping] = useState(false);
  const [winner, setWinner] = useState(null);
  const [error, setError] = useState("");

  const COLS = options.length;
  const ROWS = 8;

  useEffect(() => {
    if (isDropping && currentStep < ballPath.length) {
      const timer = setTimeout(() => setCurrentStep((s) => s + 1), 200);
      return () => clearTimeout(timer);
    } else if (isDropping && currentStep >= ballPath.length) {
      setIsDropping(false);
      const finalCol = ballPath[ballPath.length - 1];
      setWinner(options[finalCol]);
    }
  }, [isDropping, currentStep, ballPath, options]);

  const handleDrop = () => {
    setError("");
    const colNum = parseInt(startCol);
    if (isNaN(colNum) || colNum < 1 || colNum > COLS) {
      setError(`Enter a column between 1 and ${COLS}`);
      return;
    }
    if (isDropping) return;

    setWinner(null);
    setCurrentStep(0);
    setIsDropping(true);

    let path = [];
    let currentCol = colNum - 1;
    for (let i = 0; i <= ROWS; i++) {
      path.push(currentCol);
      const move = Math.random() < 0.5 ? -1 : 1;
      currentCol = Math.max(0, Math.min(COLS - 1, currentCol + move));
    }
    setBallPath(path);
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, `Option ${String.fromCharCode(65 + options.length)}`]);
  };

  const deleteOption = (index) => {
    if (options.length <= 2) return;
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    if (parseInt(startCol) > newOptions.length) {
      setStartCol("");
    }
  };

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", padding: 20 }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "12px 20px",
          borderRadius: 8,
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0, fontFamily: "chewy" }}>Decision It</h1>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "black",
            border: "none",
            color: "white",
            padding: "10px 20px",
            borderRadius: 10,
            cursor: "pointer",
            fontFamily: "chewy",
            fontSize: 18,
          }}
        >
          Home
        </button>
      </div>

      <h2
        style={{
          backgroundColor: "black",
          color: "white",
          padding: 12,
          borderRadius: 8,
          maxWidth: 720,
          margin: "0 auto 30px",
          textAlign: "center",
          fontFamily: "Georgia, serif",
        }}
      >
        Plinko - Beta
      </h2>

      <div style={{ display: "flex", maxWidth: 1500, margin: "0 auto", gap: 40 }}>
        {/* Left Side: Game */}
        <div style={{ flex: 2 }}>
          {/* Controls */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <label>
              Enter drop column (1 to {COLS}):{" "}
              <input
                type="number"
                value={startCol}
                onChange={(e) => setStartCol(e.target.value)}
                disabled={isDropping}
                style={{
                  padding: 8,
                  borderRadius: 6,
                  width: 60,
                  marginLeft: 12,
                }}
              />
            </label>
            <button
              onClick={handleDrop}
              disabled={isDropping}
              style={{
                marginLeft: 10,
                padding: "8px 16px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Drop Ball
            </button>
            {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
          </div>

          {/* Board */}
<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
  {[...Array(ROWS)].map((_, row) => (
    <div
      key={row}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, 50px)`,
        gap: "20px",
        justifyContent: "center",
      }}
    >
      {[...Array(COLS)].map((_, col) => {
        const showBall = currentStep === row && ballPath[currentStep] === col;
        return (
          <div
            key={`${row}-${col}`}
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: showBall ? "#e63946" : "#ddd",
              transition: "background-color 0.2s",
              margin: "0 auto",
            }}
          />
        );
      })}
    </div>
  ))}

  {/* Buckets aligned under columns */}
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${COLS}, 50px)`,
      gap: "20px",
      justifyContent: "center",
      marginTop: 20,
    }}
  >
    {options.map((opt, i) => {
      const isWinner = ballPath[currentStep] === i && currentStep === ROWS;
      return (
        <div
          key={`bucket-${i}`}
          style={{
            width: 60,
            height: 50,
            backgroundColor: isWinner ? "#2a9d8f" : "#333",
            color: "white",
            borderRadius: 6,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: 12,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            gridColumn: "auto",
          }}
          title={opt}
        >
          {opt}
        </div>
      );
    })}
  </div>
</div>


          {/* Winner Message */}
          {winner && (
            <div
              style={{
                marginTop: 30,
                fontSize: 24,
                color: "#2a9d8f",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              🎉 Winner: {winner}
            </div>
          )}
        </div>

        {/* Right Side: Options */}
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: "Georgia, serif" }}>Options</h3>
          {options.map((opt, i) => (
            <div key={i} style={{ display: "flex", marginBottom: 10 }}>
              <input
                type="text"
                value={opt}
                onChange={(e) => updateOption(i, e.target.value)}
                style={{
                  flexGrow: 1,
                  padding: 8,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={() => deleteOption(i)}
                disabled={options.length <= 2}
                style={{
                  marginLeft: 8,
                  backgroundColor: options.length > 2 ? "#dc3545" : "#aaa",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: 6,
                  cursor: options.length > 2 ? "pointer" : "not-allowed",
                }}
              >
                ✕
              </button>
            </div>
          ))}

          <button
            onClick={addOption}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: 10,
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            + Add Option
          </button>

          <p style={{ marginTop: 10, fontStyle: "italic", fontSize: 14, color: "#666" }}>
            Minimum 2 options required.
          </p>
        </div>
      </div>
    </div>
  );
}
