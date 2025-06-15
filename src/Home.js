import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import FAQ from "./FAQ";


function Home() {
  const navigate = useNavigate();

  const spinImage = process.env.PUBLIC_URL + "/Spinwheel.png";
  const diceImage = process.env.PUBLIC_URL + "/DieFace5.jpg";
  const coinFlipImage = process.env.PUBLIC_URL + "/QuarterImage.jpg";
  const horseraceimage = process.env.PUBLIC_URL + "/RaceHorse.jpg";
  const plinkoimage = process.env.PUBLIC_URL + "/PlinkoImage.png";

  const goToRandomGame = () => {
    const games = ["/spinTheWheel", "/dicedual", "/cointoss", "/horserace","/plinko"]; 
    const randomPath = games[Math.floor(Math.random() * games.length)];
    navigate(randomPath);
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        color: "white",
        padding: 20,
        position: "relative",
        fontFamily: "Chewy",
      }}
    >
      <Helmet>
        <title>Decision It </title>
        <meta
          name="Decision It"
          content="Decision It helps you make decisions using fun tools like spinners, Plinko, coin flips, and more. Enter your options and let fate decide!"
        />
      </Helmet>

      {/* Title Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "black",
          padding: "12px 20px",
          borderRadius: 8,
          marginBottom: 10,
        }}
      >
        <h1 style={{ margin: 0, fontFamily: "Chewy"}}>Decision It</h1>

        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "black",
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
      <div style={{ textAlign: "center", marginBottom: 10 , color: "black"}}>
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
          color: "black"
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
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: 20,
    maxWidth: "1200px",
    margin: "0 auto",
    padding: 20,
  }}
>

      
        {/* Spin the Wheel Card */}
        <div
          onClick={() => navigate("/SpinTheWheel")}
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
{/* Plinko Game Card */}
<div
  onClick={() => navigate("/plinko")}
  style={{
    cursor: "pointer",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 0 10px #007acc66",
    textAlign: "center",
    color: "white",
    userSelect: "none",
    fontFamily: "monospace",
  }}
>
  <h3 style={{ marginBottom: 10 }}>🔴 Plinko</h3>
  <img
    src={plinkoimage} // Add an image named PlinkoImage.png to your public folder
    alt="Plinko Game"
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
      <FAQ />
    </div>
  );
}

export default Home;
