import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { useNavigate } from "react-router-dom";

function Spinner() {
  const [inputs, setInputs] = useState(["", "", ""]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(null);
  const navigate = useNavigate();

  const updateOption = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const addOption = () => {
    setInputs([...inputs, ""]);
  };

  // Delete option at given index
  const deleteOption = (index) => {
    if (inputs.length <= 1) return; // optional: prevent deleting last option
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

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: "black",
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
          backgroundColor: "#7a99d9",
          padding: "12px 20px",
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <h1 style={{ margin: 0, fontFamily: "cursive" }}>🎲 Decision It</h1>

        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#7a99d9",
            border: "none",
            color: "white",
            fontWeight: "bold",
            fontFamily: "cursive",
            padding: "10px 20px",
            borderRadius: 10,
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          Home
        </button>
      </div>
      <h2
        style={{
          backgroundColor: "#7a99d9",
          padding: "10px 20px",
          borderRadius: 8,
          maxWidth: 720,
          marginBottom: 20,
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Spin the Wheel
      </h2>
      {/* Layout: Wheel left, inputs right */}
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
            onStopSpinning={() => {
              setMustSpin(false);
              alert(
                `🎉 You got: ${data[prizeNumber].option || "an empty option"}!`
              );
            }}
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
        <div style={{ maxWidth: 400, flex: "1 1 400px" }}>
          <p>Enter your decision options:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {inputs.map((opt, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => updateOption(i, e.target.value)}
                  placeholder={`Option ${i + 1}`}
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
        }}
      >
        <h3 style={{ color: "#7a99d9", marginBottom: 10 }}>How to Play</h3>
        <p>
          1. Enter options in the fields provided.<br />
          2. Click "Spin" to spin the wheel.<br />
          3. Whichever option is lands on wins!!<br />
        </p>
      </div>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
