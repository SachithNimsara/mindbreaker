import React, { useState } from "react";

export default function Journal() {
  const [entry, setEntry] = useState("");
  const [sentiment, setSentiment] = useState("Neutral");

  const analyzeSentiment = (text) => {
    if (!text) return "Neutral";
    if (text.includes("happy")) return "Positive";
    if (text.includes("sad")) return "Negative";
    return "Neutral";
  };

  const handleChange = (e) => {
    setEntry(e.target.value);
    setSentiment(analyzeSentiment(e.target.value));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Daily Journal</h2>
      <textarea
        value={entry}
        onChange={handleChange}
        placeholder="Write about your day..."
        className="w-full border p-2 rounded h-32"
      />
      <p className="mt-2 text-sm">Detected Sentiment: <b>{sentiment}</b></p>
    </div>
  );
}