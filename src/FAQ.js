import React from "react";

export default function FAQ() {
  return (
    <div style={{ padding: "40px 20px", backgroundColor: "black", color: "white",marginTop:100 }}>
      <h2 style={{ textAlign: "center", marginBottom: 30, fontSize: 28 }}>Frequently Asked Questions</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 20,
          maxWidth: 1200,
          margin: "auto",
        }}
      >
        {[
          {
            question: "What is Decision It?",
            answer:
              "Decision It is a free decision-making tool that uses fun games like spinning wheels and coin tosses to help people make random decisions quickly and enjoyably.",
          },
          {
            question: "Is Decision It free to use?",
            answer: "Yes! All features are completely free with no account required.",
          },
          {
            question: "What types of decisions can I make?",
            answer:
              "Use it for picking restaurants, assigning tasks, choosing teams, settling debates, or anything else that needs a fair, fast answer.",
          },
          {
            question: "Does it work on mobile devices?",
            answer:
              "Absolutely. Decision It is mobile-friendly and works in all modern browsers.",
          },
          {
            question: "Can I share results with friends?",
            answer:
              "Yes, you can copy the link or show your screen—results are visual and easy to share live.",
          },
          {
            question: "Is the wheel actually random?",
            answer:
              "The wheel is unpredictable—as are all the games on the site. Complete randomness is hard to achieve, but our algorithms mimic it well.",
          },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#1a1a1a",
              padding: 20,
              borderRadius: 12,
              border: "1px solid #444",
              boxShadow: "0 0 10px rgba(0, 122, 204, 0.2)",
            }}
          >
            <strong style={{ display: "block", marginBottom: 10, fontSize: 18 }}>{item.question}</strong>
            <p style={{ margin: 0, fontSize: 16 }}>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
