"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import FAQ from "./FAQ";

export default function Plinko() {
  const router = useRouter()
  const [options, setOptions] = useState(["Option A", "Option B", "Option C", "Option D"]);
  const [startCol, setStartCol] = useState(Math.ceil(options.length / 2).toString());
  const [ballPath, setBallPath] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDropping, setIsDropping] = useState(false);
  const [winner, setWinner] = useState(null);
  const [error, setError] = useState("");
  const [showWinnerBox, setShowWinnerBox] = useState(false);

  const COLS = options.length;
  const ROWS = 8;

  useEffect(() => {
    if (isDropping && currentStep < ballPath.length) {
      const timer = setTimeout(() => setCurrentStep((s) => s + 1), 200);
      return () => clearTimeout(timer);
    } else if (isDropping && currentStep >= ballPath.length) {
      setIsDropping(false);
      const finalCol = ballPath[ballPath.length - 1];
      const winningOption = options[finalCol];
      setWinner(winningOption);
      setShowWinnerBox(true);

      // 🎉 Launch confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isDropping, currentStep, ballPath, options]);

  useEffect(() => {
    setStartCol(Math.ceil(options.length / 2).toString());
  }, [options.length]);

  const handleDrop = (colParam) => {
    setError("");
    // Fix: Properly handle the column parameter
    const colNum = colParam !== undefined ? colParam : parseInt(startCol, 10);
    
    // Fix: Check if parsing failed or if the number is out of range
    if (isNaN(colNum) || colNum < 1 || colNum > COLS) {
      setError(`Enter a column between 1 and ${COLS}`);
      return;
    }
    if (isDropping) return;

    setWinner(null);
    setShowWinnerBox(false);
    setCurrentStep(0);
    setIsDropping(true);

    let path = [];
    let currentCol = colNum - 1; // Convert to 0-based index
    for (let i = 0; i <= ROWS; i++) {
      path.push(currentCol);
      if (i < ROWS) { // Don't move after the last row
        const move = Math.random() < 0.5 ? -1 : 1;
        currentCol = Math.max(0, Math.min(COLS - 1, currentCol + move));
      }
    }
    setBallPath(path);
  };

  const handleRandomDrop = () => {
    if (isDropping) return;
    const randomCol = Math.floor(Math.random() * COLS) + 1; // 1-based
    setStartCol(randomCol.toString());
    handleDrop(randomCol);
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
      setStartCol("1");
    }
  };

  // Close winner modal
  const closeWinnerBox = () => {
    setShowWinnerBox(false);
    setWinner(null);
  };

  // Remove winner and close modal
  const removeWinner = () => {
    if (!winner) return;
    const idx = options.indexOf(winner);
    if (idx === -1) return;
    const newOptions = options.filter((_, i) => i !== idx);
    setOptions(newOptions);
    setShowWinnerBox(false);
    setWinner(null);
    setStartCol(Math.ceil(newOptions.length / 2).toString());
  };

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", padding: 20 }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          fontWeight: "Bold",
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
          onClick={() => router.push("/")}
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
        Plinko To Decide
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
                min="1"
                max={COLS}
                style={{
                  padding: 8,
                  borderRadius: 6,
                  width: 60,
                  marginLeft: 12,
                }}
              />
            </label>
            <button
              onClick={() => handleDrop(parseInt(startCol, 10))}
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
            <button
              onClick={handleRandomDrop}
              disabled={isDropping}
              style={{
                marginLeft: 10,
                padding: "8px 16px",
                backgroundColor: "#ffc107",
                color: "black",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Random Drop
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
                  const showBall = isDropping && currentStep === row && ballPath[currentStep] === col;
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
                const isWinner = isDropping && ballPath[currentStep] === i && currentStep === ROWS;
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
            {/* How to Play Box */}
            <div
              style={{
                marginTop: 30,
                padding: 20,
                backgroundColor: "#222",
                borderRadius: 10,
                color: "White",
                maxWidth: 600,
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: 16,
                lineHeight: 1.5,
                textAlign:"center"
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: 10, color:"#7a99d9" }}>How to Play</h3>
              <p>
                Enter the column number where you want the ball to drop (between 1 and {options.length}).<br />
                Click Drop Ball to start the ball dropping through the Plinko board.<br />
                You can also click Random Drop to drop the ball from a random column.<br />
                Watch the ball bounce through the pegs until it lands in a bucket.<br />
                The bucket where the ball lands shows the winning option!<br />
                You can add, edit, or remove options on the right side.<br />
                Use Plinko to decide between options or to select names!
              </p>
            </div>

          </div>
          {/* Winner Modal Box */}
          {showWinnerBox && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: 30,
                  borderRadius: 12,
                  minWidth: 300,
                  maxWidth: "80vw",
                  textAlign: "center",
                  boxShadow: "0 0 10px rgba(0,0,0,0.25)",
                }}
              >
                <h2 style={{ marginBottom: 20 }}>🎉 Winner: {winner}</h2>
                <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
                  <button
                    onClick={closeWinnerBox}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#2a9d8f",
                      color: "white",
                      border: "none",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Close
                  </button>
                  <button
                    onClick={removeWinner}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
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
      <FAQ/>
    </div>
  );
}