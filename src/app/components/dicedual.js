"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import FAQ from "./FAQ";
import Image from 'next/image';

const DiceDual = () => {
  const router = useRouter()
  const [options, setOptions] = useState(["Option 1", "Option 2"]);
  const [diceRolls, setDiceRolls] = useState([]);
  const [winner, setWinner] = useState(null);
  const [tieOptions, setTieOptions] = useState([]);
  const [rolling, setRolling] = useState(false);
  const [highlightStates, setHighlightStates] = useState([]);

  const diceImages = [
  "/DieFace1.jpg",
  "/DieFace2.jpg",
  "/DieFace3.jpg",
  "/DieFace4.jpg",
  "/DieFace5.jpg",
  "/DieFace6.jpg",
];
  const rollDiceForOptions = (opts) => opts.map(() => Math.floor(Math.random() * 6) + 1);

  const rollDice = () => {
    setRolling(true);
    setWinner(null);

    const currentOptions = tieOptions.length > 0 ? tieOptions : options;
    const rolls = rollDiceForOptions(currentOptions);
    setDiceRolls(rolls);

    const maxRoll = Math.max(...rolls);
    const winners = currentOptions.filter((_, i) => rolls[i] === maxRoll);

    const newHighlightStates = currentOptions.map((_, i) => {
      if (rolls[i] === maxRoll) {
        return winners.length === 1 ? "winner" : "tie";
      }
      return "loser";
    });
    setHighlightStates(newHighlightStates);

    if (winners.length === 1) {
      setWinner(winners[0]);
      setTieOptions([]);
      setRolling(false);
    } else {
      setTimeout(() => {
        setOptions(winners);
        setTieOptions(winners);
        setDiceRolls([]);
        setHighlightStates([]);
        setWinner(null);
        setRolling(false);
      }, 1000);
    }
  };

  const addOption = () => {
    if (rolling) return;
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const deleteOption = (idx) => {
    if (rolling) return;
    const newOptions = options.filter((_, i) => i !== idx);
    setOptions(newOptions);
    setDiceRolls([]);
    setWinner(null);
    setTieOptions([]);
    setHighlightStates([]);
  };

  const updateOptionText = (idx, text) => {
    const newOptions = [...options];
    newOptions[idx] = text;
    setOptions(newOptions);
  };

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
        <h1 style={{ margin: 0, fontFamily: "chewy" }}>Decision It</h1>
        <button
          onClick={() => router.push("/")}
          style={{
            backgroundColor: "black",
            border: "none",
            color: "white",
            fontWeight: "bold",
            fontFamily: "chewy",
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
          backgroundColor: "black",
          padding: "10px 20px",
          borderRadius: 8,
          maxWidth: 720,
          marginBottom: 20,
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Dice Dual
      </h2>

      <div
        style={{
          display: "flex",
          gap: 30,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 30,
        }}
      >
        {options.map((option, idx) => (
          <div
            key={idx}
            style={{
              width: 120,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={option}
              onChange={(e) => updateOptionText(idx, e.target.value)}
              style={{
                width: "100%",
                padding: "6px",
                marginBottom: 10,
                borderRadius: 5,
                border: "1px solid #7a99d9",
                backgroundColor: "#d3d3d3",
                color: "black",
                textAlign: "center",
                fontSize: 14,
              }}
            />

            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 10,
                overflow: "hidden",
                marginBottom: 8,
                backgroundColor: "#333",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 36,
                color: "#666",
                userSelect: "none",
                boxShadow:
                  highlightStates[idx] === "winner"
                    ? "0 0 12px 4px #00ff00"
                    : highlightStates[idx] === "tie"
                    ? "0 0 12px 4px yellow"
                    : highlightStates[idx] === "loser"
                    ? "0 0 12px 4px red"
                    : "none",
              }}
            >
              {diceRolls.length === options.length ? (
                <Image
                  src={diceImages[diceRolls[idx] - 1]}
                  alt={`Die face ${diceRolls[idx]}`}
                  width={150}
                  height={116}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                  }}
                />
              ) : (
                "?"
              )}
            </div>

            <button
              onClick={() => deleteOption(idx)}
              style={{
                backgroundColor: "#cc3300",
                color: "white",
                border: "none",
                borderRadius: 5,
                padding: "4px 8px",
                cursor: "pointer",
                fontSize: 12,
              }}
              title="Delete option"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <button
          onClick={rollDice}
          disabled={rolling || options.length < 2}
          style={{
            backgroundColor: "#007acc",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: 8,
            cursor: options.length < 2 ? "not-allowed" : "pointer",
            fontSize: 16,
            marginRight: 15,
          }}
        >
          {tieOptions.length > 0 ? "Roll Again (Tie)" : "Roll Dice"}
        </button>
        <button
          onClick={addOption}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          + Add Option
        </button>
      </div>
      
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
          textAlign:"center"
        }}
      >
        <h3 style={{ color: "#7a99d9", marginBottom: 10 }}>How to Play</h3>
        <p>
          1. Enter options in the fields provided.<br />
          2. Click Roll Dice to assign a random dice roll to each.<br />
          3. The highest roll wins!<br />
          4. If there is a tie, only the tied options remain and you can roll again.
        </p>
      </div>

      {winner && (
        <div
          style={{
            marginTop: 10,
            fontSize: 22,
            color: "#00ff00",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Winner: {winner}
        </div>
      )}
      <FAQ />
    </div>
  );
};

export default DiceDual;
