import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const spinImage = process.env.PUBLIC_URL + "/Spinwheel.png";
  const diceImage = process.env.PUBLIC_URL + "/DieFace5.jpg";
  const coinFlipImage = process.env.PUBLIC_URL + "/QuarterImage.jpg";
  const horseraceimage = process.env.PUBLIC_URL + "/RaceHorse.jpg";

  const goToRandomGame = () => {
    const games = ["/spinner", "/dicedual", "/cointoss", "/horserace"]; 
    const randomPath = games[Math.floor(Math.random() * games.length)];
    navigate(randomPath);
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        color: "white",
        padding: 20,
        position: "relative",
        fontFamily: "Chewy",
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
          marginBottom: 10,
        }}
      >
        <h1 style={{ margin: 0, fontFamily: "Chewy" }}>Decision It</h1>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#7a99d9",
            border: "none",
            color: "white",
            fontWeight: "bold",
            fontFamily: "Chewy",
            padding: "10px 20px",
            borderRadius: 10,
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          Home
        </button>
      </div>
      {/* Centered Welcome Message */}
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <h1 style={{ fontSize: 42 }}>🎲 Welcome to Decision It 🎲</h1>
        <p style={{ fontSize: 20 }}>Making decision making easy and fun!</p>
      </div>

      {/* Can't Decide Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <span style={{ fontSize: 18 }}>Can't decide?</span>
        <button
          onClick={goToRandomGame}
          style={{
            backgroundColor: "#ffcc00",
            color: "black",
            fontWeight: "bold",
            border: "none",
            padding: "10px 20px",
            borderRadius: 10,
            cursor: "pointer",
            fontSize: 16,
            fontFamily: "Sans seriff",
            boxShadow: "0 0 10px #ffcc0066",
          }}
        >
          Pick Random Game
        </button>
      </div>

      {/* Games Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 30,
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        {/* Spin the Wheel Card */}
        <div
          onClick={() => navigate("/spinner")}
          style={{
            cursor: "pointer",
            backgroundColor: "#1a1a1a",
            borderRadius: 12,
            padding: 16,
            boxShadow: "0 0 10px #007acc66",
            textAlign: "center",
            color: "white",
            userSelect: "none",
            fontFamily: "monospace"
          }}
        >
          <h3 style={{ marginBottom: 10 }}>🎡 Spin the Wheel</h3>
          <img
            src={spinImage}
            alt="Spin the Wheel"
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              height: "auto",
              borderRadius: 8,
              boxShadow: "0 0 8px #007acc44",
            }}
          />
        </div>

        {/* Dice Duel Card */}
        <div
          onClick={() => navigate("/dicedual")}
          style={{
            cursor: "pointer",
            backgroundColor: "#1a1a1a",
            borderRadius: 12,
            padding: 16,
            boxShadow: "0 0 10px #007acc66",
            textAlign: "center",
            color: "white",
            userSelect: "none",
            fontFamily: "monospace"
          }}
        >
          <h3 style={{ marginBottom: 10 }}>🎲 Dice Duel</h3>
          <img
            src={diceImage}
            alt="Dice Duel"
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              height: "auto",
              borderRadius: 8,
              boxShadow: "0 0 8px #007acc44",
            }}
          />
        </div>

        
        <div
          onClick={() => navigate("/cointoss")} 
          style={{
            cursor: "pointer",
            backgroundColor: "#1a1a1a",
            borderRadius: 12,
            padding: 16,
            boxShadow: "0 0 10px #007acc66",
            textAlign: "center",
            color: "white",
            userSelect: "none",
            fontFamily: "monospace"
          }}
        >
          <h3 style={{ marginBottom: 10 }}>🪙 Coin Toss</h3>
          <img
            src={coinFlipImage}
            alt="Coin Toss"
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              height: "auto",
              borderRadius: 8,
              boxShadow: "0 0 8px #007acc44",
            }}
          />
        </div>

        <div
  onClick={() => navigate("/horserace")}
  style={{
    cursor: "pointer",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 0 10px #007acc66",
    textAlign: "center",
    color: "white",
    userSelect: "none",
    fontFamily: "monospace"
  }}
>
  <h3 style={{ marginBottom: 10 }}>🐎 Horse Race</h3>
  <img
    src={horseraceimage} // Add a fun horse image in public/
    alt="Horse Race"
    style={{
      width: "100%",
      aspectRatio: "1 / 1",
      height: "auto",
      borderRadius: 8,
      boxShadow: "0 0 8px #007acc44",
    }}
  />
</div>

      </div>
    </div>
  );
}

export default Home;
