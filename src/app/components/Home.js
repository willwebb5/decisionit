"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FAQ from "./FAQ";

function Home() {
  const router = useRouter()
  
  // Game data for easier management
  const games = [
    {
      title: "🎡 Spin the Wheel",
      path: "/spinthewheel",
      image: "/Spinwheel.png",
      alt: "Colorful spinning wheel for decision making"
    },
    {
      title: "🎲 Dice Duel",
      path: "/dicedual", 
      image: "/DieFace5.jpg",
      alt: "Dice showing number 5 for random selection"
    },
    {
      title: "🪙 Coin Toss",
      path: "/cointoss",
      image: "/QuarterImage.jpg", 
      alt: "Quarter coin for heads or tails decision"
    },
    {
      title: "🐎 Horse Race",
      path: "/horserace",
      image: "/RaceHorse.jpg",
      alt: "Racing horse for competitive decision making"
    },
    {
      title: "🔴 Plinko",
      path: "/plinko",
      image: "/PlinkoImage.png",
      alt: "Plinko board with falling ball for random selection"
    }
  ];

  const goToRandomGame = () => {
    const gamePaths = games.map(game => game.path);
    const randomPath = gamePaths[Math.floor(Math.random() * gamePaths.length)];
    router.push(randomPath);
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
          onClick={() => router.push("/")}
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
        <h2 style={{ fontSize: 42 }}>🎲 Welcome to Decision It 🎲</h2>
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
        <span style={{ fontSize: 18 }}>Can&apos;t decide?</span>
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
        {games.map((game, index) => (
          <div
            key={game.path}
            onClick={() => router.push(game.path)}
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
            <h3 style={{ marginBottom: 10 }}>{game.title}</h3>
            <div style={{ 
              position: "relative", 
              width: "100%", 
              aspectRatio: "1 / 1",
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 0 8px #007acc44",
            }}>
              <Image
                src={game.image}
                alt={game.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                style={{
                  objectFit: "cover",
                }}
                priority={index < 2} // Prioritize first 2 images
                quality={85}
              />
            </div>
          </div>
        ))}
      </div>
      
      <FAQ />
    </div>
  );
}

export default Home;