"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';
import FAQ from "./FAQ";

// Dynamic import for the Wheel component to avoid SSR issues
import dynamic from 'next/dynamic';

const Wheel = dynamic(
  () => import('react-custom-roulette').then((mod) => mod.Wheel),
  { 
    ssr: false,
    loading: () => <div style={{ width: 300, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc', borderRadius: '50%' }}>Loading wheel...</div>
  }
);

function SpinTheWheel() {
  const [inputs, setInputs] = useState(["", "", ""]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(null);
  const [showResultBox, setShowResultBox] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const inputRefs = useRef([]);

  // Ensure we're on the client side before rendering interactive components
  useEffect(() => {
    setIsClient(true);
  }, []);

  const updateOption = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const addOption = () => {
    setInputs([...inputs, ""]);
  };

  const deleteOption = (index) => {
    if (inputs.length <= 1) return; // prevent deleting last option
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  const data = inputs.map((opt) => ({ option: opt }));

  const handleSpinClick = () => {
    if (data.length === 0) {
      alert("Please add at least one option");
      return;
    }
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  // Called when spinning stops
  const onStopSpinning = () => {
    setMustSpin(false);
    setShowResultBox(true);
  };

  // Close result box without removing option
  const closeResultBox = () => {
    setShowResultBox(false);
    setPrizeNumber(null);
  };

  // Remove chosen option and close box
  const removeChosenOption = () => {
    if (prizeNumber !== null) {
      deleteOption(prizeNumber);
      setShowResultBox(false);
      setPrizeNumber(null);
    }
  };

  // Don't render until we're on the client side
  if (!isClient) {
    return (
      <div style={{ padding: 20, backgroundColor: "white", minHeight: "100vh" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: "white",
        minHeight: "100vh",
        color: "white",
        position: "relative",
      }}
    >
      {/* Title Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "black",
          padding: "12px 20px",
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <h1 style={{ margin: 0, fontFamily: "Chewy" }}>Decision It</h1>

        <button
          onClick={() => router.push("/")}
          style={{
            backgroundColor: "black",
            border: "none",
            color: "white",
            fontWeight: "bold",
            fontFamily: "Chewy",
            padding: "10px 20px",
            borderRadius: 10,
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          Home
        </button>
      </div>

      <h2
        style={{
          backgroundColor: "black",
          padding: "10px 20px",
          borderRadius: 8,
          maxWidth: 720,
          marginBottom: 20,
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
          color: "white",
        }}
      >
        Spin the Wheel
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        <div style={{ minWidth: 300 }}>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={onStopSpinning}
            outerBorderColor={"#7a99d9"}
            outerBorderWidth={10}
            innerBorderColor={"#000000"}
            radiusLineColor={"#000000"}
            radiusLineWidth={4}
            textColors={["#000"]}
            fontSize={18}
            perpendicularText={true}
            spinDuration={0.8}
          />
        </div>

        {/* Input Boxes with delete '×' */}
        <div style={{ maxWidth: 400, flex: "1 1 400px", color: "black" }}>
          <p>Enter your decision options:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {inputs.map((opt, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <input
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  value={opt}
                  onChange={(e) => updateOption(i, e.target.value)}
                  placeholder={`Option ${i + 1}`}
                  onKeyDown={(e) => {
                    if (e.key === "Tab" && !e.shiftKey) {
                      e.preventDefault();
                      if (inputRefs.current[i + 1]) {
                        inputRefs.current[i + 1].focus();
                      }
                    } else if (e.key === "Tab" && e.shiftKey) {
                      e.preventDefault();
                      if (inputRefs.current[i - 1]) {
                        inputRefs.current[i - 1].focus();
                      }
                    }
                  }}
                  style={{
                    flexGrow: 1,
                    padding: 10,
                    borderRadius: 12,
                    border: "1px solid #ccc",
                    fontSize: 16,
                    textAlign: "center",
                    color: "black",
                  }}
                />
                <button
                  onClick={() => deleteOption(i)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#cc0000",
                    fontWeight: "bold",
                    fontSize: 20,
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  aria-label={`Delete option ${i + 1}`}
                  title="Delete option"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addOption}
            style={{
              marginTop: 20,
              padding: "10px 16px",
              fontSize: 14,
              borderRadius: 12,
              border: "1px solid #007acc",
              backgroundColor: "white",
              color: "#007acc",
              cursor: "pointer",
            }}
          >
            + Add an option
          </button>

          <button
            onClick={handleSpinClick}
            style={{
              marginTop: 30,
              width: "100%",
              padding: 14,
              fontSize: 18,
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: 12,
              cursor: "pointer",
            }}
          >
            Spin
          </button>

          {/* --- HOW TO PLAY BOX --- */}
          <div
            style={{
              marginTop: 30,
              padding: 20,
              backgroundColor: "#222",
              borderRadius: 10,
              color: "white",
              maxWidth: 600,
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: 16,
              lineHeight: 1.5,
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "#7a99d9", marginBottom: 10 }}>How to Play</h3>
            <p>
              1. Enter options in the fields provided.
              <br />
              2. Click "Spin" to spin the wheel.
              <br />
              3. Whichever option it lands on either wins or is removed!
              <br />
              4. Have fun deciding between options with this fun spinner of options!
              <br />
            </p>
          </div>
        </div>
      </div>

      {/* RESULT BOX MODAL */}
      {showResultBox && prizeNumber !== null && (
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
          role="dialog"
          aria-modal="true"
          aria-labelledby="result-box-title"
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              padding: 30,
              maxWidth: 400,
              width: "90%",
              textAlign: "center",
              color: "black",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            <h2 id="result-box-title" style={{ marginBottom: 20 }}>
              You got:
            </h2>
            <p
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 30,
                minHeight: 40,
              }}
            >
              {data[prizeNumber]?.option || "an empty option"}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                gap: 20,
              }}
            >
              <button
                onClick={closeResultBox}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  borderRadius: 12,
                  border: "1px solid #007acc",
                  backgroundColor: "white",
                  color: "#007acc",
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                Close
              </button>

              <button
                onClick={removeChosenOption}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  borderRadius: 12,
                  border: "none",
                  backgroundColor: "#cc0000",
                  color: "white",
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
      <FAQ/>
    </div>
  );
}

export default SpinTheWheel;