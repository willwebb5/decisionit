import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import FAQ from "./FAQ";

function CoinToss() {
  const [headsOption, setHeadsOption] = useState("");
  const [tailsOption, setTailsOption] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleFlip = () => {
    const flip = Math.random() < 0.5 ? "Heads" : "Tails";
    setResult(flip === "Heads" ? headsOption || "Heads" : tailsOption || "Tails");
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        color: "white",
        minHeight: "100vh",
        padding: 20,
        fontFamily: "Georgia, serif",
      }}
    >
      {/* React Helmet for SEO */}
      <Helmet>
        <title> Coin Toss - Decision It </title>
        <meta
          name="Coin Toss to Decide"
          content="Can't decide between two options? Flip a coin and its out of your hands! This coin toss will help you decide quickly and for fun!"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Spin the Wheel - Decision It" />
        <meta
          property="og:description"
          content="Use Spin the Wheel to decide between options with a fun and interactive spinner."
        />
      </Helmet>
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
          onClick={() => navigate("/")}
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
          fontFamily: "Georgia, serif",
        }}
      >
        Coin Toss to Decide
      </h2>
      {/* Input and Flip Section */}
      <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" ,color:"black"}}>
        <p>Enter option for each coin side:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="text"
            placeholder="Heads option"
            value={headsOption}
            onChange={(e) => setHeadsOption(e.target.value)}
            style={{
              padding: 10,
              borderRadius: 8,
              fontSize: 16,
              border: "1px solid #ccc",
              color: "black",
            }}
          />
          <input
            type="text"
            placeholder="Tails option"
            value={tailsOption}
            onChange={(e) => setTailsOption(e.target.value)}
            style={{
              padding: 10,
              borderRadius: 8,
              fontSize: 16,
              border: "1px solid #ccc",
              color: "black",
            }}
          />
          <button
            onClick={handleFlip}
            style={{
              marginTop: 20,
              padding: "12px 24px",
              fontSize: 18,
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            Flip Coin
          </button>
        </div>

        {/* Result Display */}
        {result && (
          <div style={{ marginTop: 30, fontSize: 24 }}>
            🪙 Result: <strong>{result}</strong>
          </div>
        )}
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
          fontFamily: "Georgia, serif",
        }}
      >
        <h3 style={{ color: "#7a99d9", marginBottom: 10 }}>How to Play</h3>
        <p>
          1. Enter options in the fields provided.<br />
          2. Click "Flip Coin".<br />
          3. Winner is shown below<br />
          4. Odds are 50/50.
        </p>
      </div>

        {/* Odds Info */}
        <p style={{ marginTop: 40, fontStyle: "italic", color: "#ccc" }}>
          Each side has a 50% chance.
        </p>
      </div>
      <FAQ />
    </div>
  );
}

export default CoinToss;
