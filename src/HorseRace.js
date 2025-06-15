import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import FAQ from "./FAQ";

function RunnerRace() {
  const [runners, setRunners] = useState(["Runner 1", "Runner 2", "Runner 3"]);
  const [positions, setPositions] = useState(runners.map(() => 0));
  const [raceStarted, setRaceStarted] = useState(false);
  const [finishOrder, setFinishOrder] = useState([]);
  const tickCountRef = useRef(0);
  const finishOrderRef = useRef([]);
  const intervalRef = useRef(null);
  const progressRef = useRef([]);
  const runnerSpeedsRef = useRef([]);
  const navigate = useNavigate();

  const speedOptions = {
    slow: { label: "Slow", targetTimeMs: 60000, interval: 200 },
    medium: { label: "Medium", targetTimeMs: 20000, interval: 100 },
    fast: { label: "Fast", targetTimeMs: 10000, interval: 50 },
    extraFast: { label: "Extra Fast", targetTimeMs: 5000, interval: 30 },
  };

  const [speed, setSpeed] = useState("medium");

  useEffect(() => {
    finishOrderRef.current = finishOrder;
  }, [finishOrder]);

  useEffect(() => {
    progressRef.current = runners.map(() => 0);
    setPositions(runners.map(() => 0));
    finishOrderRef.current = [];
    setFinishOrder([]);
  }, [runners]);

  const updateRunner = (index, value) => {
    if (raceStarted) return;
    setRunners((prev) => {
      const newRunners = [...prev];
      newRunners[index] = value;
      return newRunners;
    });
  };

  const addRunner = () => {
    if (raceStarted) return;
    setRunners((prev) => [...prev, `Runner ${prev.length + 1}`]);
  };

  const deleteRunner = (index) => {
    if (raceStarted) return;
    if (runners.length <= 1) return;
    setRunners((prev) => prev.filter((_, i) => i !== index));
    setPositions((prev) => prev.filter((_, i) => i !== index));
    setFinishOrder((prev) => prev.filter((f) => f.index !== index));
    progressRef.current = progressRef.current.filter((_, i) => i !== index);
    runnerSpeedsRef.current = runnerSpeedsRef.current.filter((_, i) => i !== index);
  };

  const placeSuffix = (place) => {
    if (place === 1) return "1st";
    if (place === 2) return "2nd";
    if (place === 3) return "3rd";
    return `${place}th`;
  };

  const handleStart = () => {
    progressRef.current = runners.map(() => 0);
    setPositions(runners.map(() => 0));
    setFinishOrder([]);
    tickCountRef.current = 0;
    finishOrderRef.current = [];

    // More variable base speed: 0.5 to 1.5
    runnerSpeedsRef.current = runners.map(() => 0.5 + Math.random());

    setRaceStarted(true);
  };

  useEffect(() => {
    if (!raceStarted) return;

    const { targetTimeMs, interval } = speedOptions[speed];
    const totalTicks = Math.ceil(targetTimeMs / interval);
    const baseStep = 100 / totalTicks;

    intervalRef.current = setInterval(() => {
      tickCountRef.current++;

      setPositions((prevPositions) => {
        const finishedCount = finishOrderRef.current.length;
        if (finishedCount === runners.length) {
          clearInterval(intervalRef.current);
          setRaceStarted(false);
          return prevPositions;
        }

        const newPositions = prevPositions.map((pos, i) => {
          if (finishOrderRef.current.some((f) => f.index === i)) {
            return 100;
          }

          // Super unpredictable random factor: 0.1 to 2.5
          const randomFactor = 0.1 + Math.random() * 2.4;

          // 15% chance to stall this tick (no progress)
          const stallChance = Math.random();
          if (stallChance < 0.15) return pos;

          // Occasional boost chance (10%)
          const boostChance = Math.random();
          const boostMultiplier = boostChance < 0.1 ? 1.5 + Math.random() : 1;

          // Calculate step
          const step =
            baseStep *
            runnerSpeedsRef.current[i] *
            randomFactor *
            boostMultiplier;

          progressRef.current[i] += step;
          if (progressRef.current[i] > 100) progressRef.current[i] = 100;

          return Math.floor(progressRef.current[i]);
        });

        // Detect new finishers this tick
        const newFinishers = [];
        newPositions.forEach((pos, i) => {
          if (
            pos >= 100 &&
            !finishOrderRef.current.some((f) => f.index === i)
          ) {
            newFinishers.push({
              index: i,
              name: runners[i],
              finishTick: tickCountRef.current,
            });
          }
        });

        if (newFinishers.length > 0) {
          setFinishOrder((prev) => [...prev, ...newFinishers]);
          finishOrderRef.current = [...finishOrderRef.current, ...newFinishers];
        }

        return newPositions;
      });
    }, interval);

    return () => clearInterval(intervalRef.current);
  }, [raceStarted, runners, speed]);

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
      {/* React Helmet for SEO */}
            <Helmet>
              <title> Horse Race - Decision It</title>
              <meta
                name="Horse Race to Decide"
                content="This horse race helps you decide between options! Input your options and watch the horses decide for you."
              />
              <meta name="robots" content="index, follow" />
              <meta property="og:title" content="Spin the Wheel - Decision It" />
              <meta
                property="og:description"
                content="Use Spin the Wheel to decide between options with a fun and interactive spinner."
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
          marginBottom: 20,
        }}
      >
        <h1 style={{ margin: 0, fontFamily: "Chewy" }}>Decision It</h1>
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
        Horse Race
      </h2>

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          gap: 30,
        }}
      >
        {/* Left: Race Track */}
        <div
          style={{
            flex: 2,
            padding: 20,
            backgroundColor: "#222",
            borderRadius: 10,
            color: "white",
            fontSize: 16,
            minHeight: 300,
          }}
        >
          {runners.map((runner, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontWeight: "bold",
                  marginBottom: 6,
                  color: "#7a99d9",
                }}
              >
                {runner}
              </div>
              <div
                aria-label={`${runner} progress bar`}
                role="progressbar"
                aria-valuenow={positions[i]}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{
                  height: 20,
                  backgroundColor: "#555",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${positions[i]}%`,
                    height: "100%",
                    backgroundColor: "#28a745",
                    transition: "width 0.15s ease",
                  }}
                />
              </div>
            </div>
          ))}

          {finishOrder.length === runners.length && (
            <div
              style={{
                marginTop: 30,
                padding: 20,
                backgroundColor: "#111",
                borderRadius: 10,
                color: "#28a745",
                fontWeight: "bold",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              <h3>🏆 Final Results 🏆</h3>
              <ol
                style={{
                  textAlign: "left",
                  margin: "10px auto",
                  maxWidth: 300,
                  paddingLeft: 20,
                }}
              >
                {finishOrder
                  .slice()
                  .sort((a, b) => a.finishTick - b.finishTick)
                  .map((f, idx) => (
                    <li key={f.index} style={{ marginBottom: 6 }}>
                      {placeSuffix(idx + 1)}: {f.name}
                    </li>
                  ))}
              </ol>
            </div>
          )}
        </div>

        {/* Right: Options panel */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            backgroundColor: "#222",
            borderRadius: 10,
            padding: 20,
            maxHeight: 500,
            overflowY: "auto",
          }}
        >
          {/* Speed Selector */}
          <div>
            <label
              htmlFor="speedSelect"
              style={{ display: "block", marginBottom: 6, fontWeight: "bold" }}
            >
              Select Race Speed:
            </label>
            <select
              id="speedSelect"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              disabled={raceStarted}
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 8,
                fontSize: 14,
                fontWeight: "bold",
                cursor: raceStarted ? "not-allowed" : "pointer",
              }}
            >
              {Object.entries(speedOptions).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Runner Inputs */}
          {runners.map((runner, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "#333",
                padding: 8,
                borderRadius: 8,
              }}
            >
              <input
                type="text"
                value={runner}
                onChange={(e) => updateRunner(i, e.target.value)}
                placeholder={`Runner ${i + 1}`}
                disabled={raceStarted}
                aria-label={`Runner ${i + 1} name`}
                style={{
                  flexGrow: 1,
                  padding: 8,
                  fontSize: 16,
                  borderRadius: 8,
                  border: "none",
                  fontWeight: "bold",
                }}
              />
              <button
                onClick={() => deleteRunner(i)}
                disabled={raceStarted}
                style={{
                  backgroundColor: "#bb2222",
                  color: "white",
                  borderRadius: 6,
                  fontWeight: "bold",
                  padding: "4px 12px",
                  cursor: raceStarted ? "not-allowed" : "pointer",
                  border: "none",
                }}
                aria-label={`Delete runner ${i + 1}`}
              >
                X
              </button>
            </div>
          ))}

          <button
            onClick={addRunner}
            disabled={raceStarted}
            style={{
              padding: 12,
              backgroundColor: "#28a745",
              color: "white",
              fontWeight: "bold",
              borderRadius: 10,
              fontSize: 16,
              cursor: raceStarted ? "not-allowed" : "pointer",
              border: "none",
            }}
            aria-label="Add runner"
          >
            + Add Runner
          </button>

          <button
            onClick={handleStart}
            disabled={raceStarted || runners.length < 2}
            style={{
              padding: 12,
              backgroundColor: raceStarted ? "#555" : "#7a99d9",
              color: "white",
              fontWeight: "bold",
              borderRadius: 10,
              fontSize: 18,
              cursor:
                raceStarted || runners.length < 2 ? "not-allowed" : "pointer",
              border: "none",
              marginTop: 12,
            }}
            aria-label="Start race"
          >
            Start Race
          </button>
        </div>
      </div>
      <FAQ/>
    </div>
  );
}

export default RunnerRace;
